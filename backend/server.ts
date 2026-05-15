import express from 'express';
import pool from './db.js';
import cors from 'cors'
import bcrypt from 'bcrypt';
import generateAndSendToken from './generateAndSendToken.js';
import verifyToken from './verifyToken.js';
import checkAuth from './checkAuth.js';
import { Request, Response } from 'express';
const app = express();
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))
app.use(express.json());

declare global {
  namespace Express {
    interface Request {
      userID?: number;
    }
  }
}

type User = {
    name: string,
    email: string,
    password: string
}

type ExistingUser = {
    email: string,
    password: string
}

type Transaction = {
    classification: string,
    amount: number,
    category: string,
    date_of_transaction: Date,
    note?: string
}

type Budget = {
    category: string,
    budget_limit: number
}

app.post("/api/auth/signup", async (req: Request, res: Response) => {
    const {name, email, password}:User = req.body;

    try {
        if (!name || !email || !password) {
            return res.status(400).json({success: false, message: "Didnt receive all info"})
        }

        const userAlreadyExists = await pool.query(`
            SELECT * 
            FROM users
            WHERE email = $1
            `, [email])
        if (userAlreadyExists.rows.length > 0) {
            return res.status(400).json({success: false, message: "User exists already"})
        }
        
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await pool.query(`
            INSERT INTO users (name, email, password)
            VALUES ($1, $2, $3)
            RETURNING *
            `, [name, email, hashedPassword])

        generateAndSendToken(newUser.rows[0].id, res);
        

    } catch (error) {
        return res.status(500).json({success: false})
    }
});

app.post("/api/auth/login", async (req: Request, res: Response) => {
    const {email, password}:ExistingUser = req.body;

    try {
        if (!email || !password) {
            return res.status(400).json({success: false, message: "Didnt receive all info"})
        }

        const existingUser = await pool.query(`
            SELECT *
            FROM users
            WHERE email = $1
            `, [email]);
        if (existingUser.rows.length < 1) {
            return res.status(400).json({success: false, message: "No account found"})
        }

        const isPasswordTheSame = await bcrypt.compare(password, existingUser.rows[0].password);
        if (!isPasswordTheSame) {
            return res.status(400).json({success: false, message: "Incorrect credentials"})
        }
        generateAndSendToken(existingUser.rows[0].id, res);
    } catch (error) {
        return res.status(500).json({success: false, error: error})
    }
});

app.get("/api/auth/check", verifyToken, checkAuth);


app.post("/api/transactions/add", verifyToken, async (req: Request, res: Response) => {
    const {classification, amount, category, date_of_transaction, note}:Transaction = req.body;

    try {
        if (!classification || !amount || !category ||!date_of_transaction || amount <= 0) {
            return res.status(403).json({success: false, message: "Didnt receive all info required"});
        }

        const newTransaction = await pool.query(`
            INSERT INTO transactions (userid, classification, amount, category, date_of_transaction, note)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING *    
        `, [req.userID, classification, amount, category, date_of_transaction, note])
        res.status(200).json({success: true, data: newTransaction.rows})
    } catch (error) {
        return res.status(500).json({success: false});
    }
});

app.get("/api/transactions/get", verifyToken, async (req: Request, res: Response) => {
    try {
        const usersTransactions = await pool.query(`
            SELECT *
            FROM transactions
            WHERE userid = $1
            `, [req.userID]);
        res.status(200).json({success: true, data: usersTransactions.rows})
    } catch (error) {
        return res.status(500).json({success: false, message: "Failed to retreive transactions"})
    }
})

app.put("/api/transactions/update/:id", verifyToken, async (req: Request, res: Response) => {
    const {id} = req.params;
    const {classification, amount, category, date_of_transaction, note} = req.body;

    try {
        if (!id || !classification || !amount || !category || !date_of_transaction || amount <= 0) {
            return res.status(400).json({success: false, message: "Didnt get info to update"})
        }

        const updatedTransaction = await pool.query(`
            UPDATE transactions
            SET classification = $1, amount = $2, category = $3, date_of_transaction = $4, note = $5
            WHERE userid = $6 AND id = $7
            RETURNING *
            `, [classification, amount, category, date_of_transaction, note, req.userID, id])
        res.status(200).json({success: true, data: updatedTransaction.rows})
    } catch (error) {
        return res.status(500).json({success: false})
    }
})

app.delete("/api/transactions/delete/:id", verifyToken, async (req: Request, res: Response) => {

    const {id} = req.params;

    try {
        if (!id) {
            return res.status(400).json({success: false, message: "Didnt receive an ID"})
        }

        const deletedTransaction = await pool.query(`
            DELETE FROM transactions
            WHERE userid = $1 AND id = $2
            RETURNING *
            `, [req.userID, id])
        res.status(200).json({success: true, data: deletedTransaction.rows})
    } catch (error) {
        return res.status(500).json({success: false})
    }
})

app.post("/api/budgets/add", verifyToken, async (req: Request, res: Response) => {
    const {category, budget_limit}:Budget = req.body;

    try {
        if (!category ||!budget_limit || budget_limit <= 0) {
            return res.status(400).json({success: false, message: "Didn't receive category or budget limit"})
        }

        const newBudget = await pool.query(`
            INSERT INTO budgets (userid, category, budget_limit)
            VALUES ($1, $2, $3)
            RETURNING *
            `, [req.userID, category, budget_limit])
        res.status(200).json({success: true, data: newBudget.rows})
    } catch (error) {
        return res.status(500).json({success: false})
    }
})

app.get("/api/budgets/get", verifyToken, async (req: Request, res: Response) => {
    try {
        const usersBudgets = await pool.query(`
            SELECT *
            FROM budgets
            WHERE userid = $1
            `, [req.userID]);
        res.status(200).json({success: true, data: usersBudgets.rows})
    } catch (error) {
        return res.status(500).json({success: false})
    }
})

app.put("/api/budgets/update/:id", verifyToken, async (req: Request, res: Response) => {
    const {id} = req.params;
    const {category, budget_limit} = req.body;

    try {
        if (!id || !category || !budget_limit || budget_limit <= 0) {
            return res.status(400).json({success: false, message: "Didn't receive all info to update budget"})
        }

        const updatedBudget = await pool.query(`
            UPDATE budgets
            SET category = $1, budget_limit = $2
            WHERE userid = $3 AND id = $4
            RETURNING *
            `,[category, budget_limit, req.userID, id]);
        res.status(200).json({success: true, data: updatedBudget.rows})
    } catch (error) {
        return res.status(500).json({success: false})
    }
})

app.delete("/api/budgets/delete/:id", verifyToken, async (req: Request, res: Response) => {
    const {id} = req.params;

    try {
        if (!id) {
            return res.status(400).json({success: false, message: "Didnt receive an ID"})
        }

        const deletedBudget = await pool.query(`
            DELETE FROM budgets
            WHERE userid = $1 AND id = $2
            RETURNING *
            `, [req.userID, id])
        res.status(200).json({success: true, data: deletedBudget.rows})
    } catch (error) {
        return res.status(500).json({success: false})
    }
})


app.get("/api/info/total-expenses-and-income", verifyToken, async (req: Request, res: Response) => {
    try {
        const totalExpAndInc = await pool.query(`
        SELECT classification, SUM(amount)
        FROM transactions
        WHERE userid = $1
        GROUP BY classification    
        `,[req.userID])

        const formatted = totalExpAndInc.rows.map(entry => {
            return [entry.classification, entry.sum]
        })
        const formattedObject = Object.fromEntries(formatted);

        res.status(200).json({success: true, data: formattedObject})
    } catch (error) {
        return res.status(500).json({success: false})
    }
})

app.get("/api/info/expenses-and-income-by-category", verifyToken, async (req: Request, res: Response) => {
    try {
        const expByCategory = await pool.query(`
         SELECT category, SUM(amount) 
         FROM transactions
         WHERE userid = $1 AND classification = $2
         GROUP BY category    
        `,[req.userID, 'Expense'])
        
        const incByCategory = await pool.query(`
        SELECT category, SUM(amount)    
        FROM transactions
        WHERE userid = $1 AND classification = $2
        GROUP BY category
        `, [req.userID, 'Income'])

        res.status(200).json({success: true, data: expByCategory.rows, data2: incByCategory.rows})
    } catch (error) {
        return res.status(500).json({success:false})
    }
})

app.get("/api/info/expenses-and-income-within-last-month", verifyToken, async (req: Request, res: Response) => {
    try {
        const infoWithinLastMonth = await pool.query(`
        SELECT classification, SUM(amount)
        FROM transactions
        WHERE userid = $1 AND date_trunc('month', date_of_transaction) = date_trunc('month', CURRENT_DATE)
        GROUP BY classification  
        `, [req.userID]) 
    
        const formattedInfo = infoWithinLastMonth.rows.map(entry => {
            return [entry.classification, entry.sum]
        })
        const formattedObject = Object.fromEntries(formattedInfo)

        res.status(200).json({success: true, data: formattedObject})
    } catch (error) {
        return res.status(500).json({success: false})
    }
})

app.get("/api/info/expenses-and-income-from-previous-month", verifyToken, async(req: Request, res: Response) => {
    try {
        const infoPreviousMonth = await pool.query(`
            SELECT classification, SUM(amount)
            FROM transactions
            WHERE userid = $1 AND date_trunc('month', date_of_transaction) = date_trunc('month', CURRENT_DATE - INTERVAL '1 month')
            GROUP BY classification
            `,[req.userID])
        const formatted = infoPreviousMonth.rows.map(entry => {
            return [entry.classification, entry.sum]
        })
        const formattedObject = Object.fromEntries(formatted)
        res.status(200).json({success: true, data: formattedObject})
    } catch (error) {
        return res.status(500).json({success: false})
    }
})

app.get("/api/info/expenses-this-week", verifyToken, async (req: Request, res: Response) => {
    try {
        const expensesLast7 = await pool.query(`
            SELECT classification, SUM(amount)
            FROM transactions
            WHERE userid = $1 AND classification = $2 AND date_of_transaction >= CURRENT_DATE - INTERVAL '7 Days'
            GROUP BY classification
            `, [req.userID, 'Expense'])
        const formatted = expensesLast7.rows.map(entry => {
            return [entry.classification, entry.sum]
        })
        const formattedObject = Object.fromEntries(formatted)
        res.status(200).json({success: true, data: formattedObject})
    } catch (error) {
        return res.status(500).json({success: false})
    }
})

app.get("/api/info/expenses/prev/week", verifyToken, async (req: Request, res: Response) => {
    try {
        const expensesPrev7 = await pool.query(`
            SELECT classification, SUM(amount)
            FROM transactions
            WHERE userid = $1 AND classification = $2 AND date_of_transaction < CURRENT_DATE - INTERVAL '7 Days' and date_of_transaction >= CURRENT_DATE - INTERVAL '14 Days'
            GROUP BY classification    
        `, [req.userID, 'Expense'])
            
        const formatted = expensesPrev7.rows.map(entry => {
            return [entry.classification, entry.sum]
        })
        const formattedObject = Object.fromEntries(formatted);
        res.status(200).json({success: true, data: formattedObject})
    } catch (error) {
        return res.status(500).json({success: false})
    }
})

app.get("/api/info/budget-expense-comparison", verifyToken, async (req: Request, res: Response) => {
    try {
        const budgetExpComparison = await pool.query(`
            SELECT budgets.category, budgets.budget_limit, SUM(transactions.amount)
            FROM budgets
            LEFT JOIN transactions
            ON budgets.category = transactions.category AND budgets.userid = transactions.userid AND transactions.classification = $2
            WHERE budgets.userid = $1
            GROUP BY budgets.category, budgets.budget_limit
        `, [req.userID, 'Expense'])
        res.status(200).json({success: true, data: budgetExpComparison.rows})
    } catch (error) {
        return res.status(500).json({success: false})
    }
})

app.get("/api/info/expense-amt-per-day", verifyToken, async (req: Request, res: Response) => {
    try {
        const expenseAmtPerDay = await pool.query(`
            SELECT date_of_transaction, SUM(amount)
            FROM transactions
            WHERE userid = $1 AND classification = $2 AND date_of_transaction >= CURRENT_DATE - INTERVAL '7 Days'
            GROUP BY date_of_transaction
            ORDER BY date_of_transaction ASC
            `, [req.userID, 'Expense'])
        res.status(200).json({success: true, data: expenseAmtPerDay.rows})
    } catch (error) {
        return res.status(500).json({sucess: false})
    }
})

app.get("/api/info/greatest-expense-this-week", verifyToken, async (req: Request, res: Response) => {
    try {
        const greatestExpense = await pool.query(`
        SELECT category, SUM(amount)
        FROM transactions
        WHERE userid = $1 AND classification = $2 AND date_of_transaction >= CURRENT_DATE - INTERVAL '7 Days'    
        GROUP BY category
        `, [req.userID, 'Expense'])
            
        const sorted = greatestExpense.rows.sort((a,b) => b.sum - a.sum)
        res.status(200).json({success: true, data: sorted[0]})
    } catch (error) {
        return res.status(500).json({success: false})
    }
})

app.listen(5000, () => {
    try {
        console.log("Started server successfully")
    } catch (error) {
        console.error(error)
    }
})