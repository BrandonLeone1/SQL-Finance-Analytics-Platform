import {Routes, Route} from 'react-router-dom'
import Signup from './pages/Signup';
import Login from './pages/Login';
import { useEffect, useState } from 'react';
import Dashboard from './pages/Dashboard';
import PublicRoute from './components/PublicRoute';
import ProtectedRoute from './components/ProtectedRoute';
import Transactions from './pages/Transactions';
import { Budgets } from './pages/Budgets';
import { Transaction } from './types/Transaction';
import { Budget } from './types/Budget';
import Info from './pages/Info';

function App() {

const [activeUser, setActiveUser] = useState(null);
const [transactions, setTransactions] = useState<Transaction[]>([]);
const [budgets, setBudgets] = useState<Budget[]>([]);
const [loadingUser, setLoadingUser] = useState(false);
const [loadingTransactions, setLoadingTransaction] = useState(true);
const [loadingBudgets, setLoadingBudgets] = useState(true);
const [loadingOverview, setLoadingOverview] = useState(true);
const [addedUser, setAddedUser] = useState(false);
const API_URL = import.meta.env.VITE_API_URL

async function handleAddUser (newUser: object) {
  
  try {
   const response = await fetch(`${API_URL}/api/auth/signup`, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    credentials: "include",
    body: JSON.stringify(newUser)
  })
  const data = await response.json();
  if (data.token) {
    setAddedUser(true);

    setTimeout(() => {
      setAddedUser(false)
    }, 3000);
  }
  localStorage.setItem("token", data.token); 
  } catch (error) {
    console.error(error)
  }
  
}

async function loginUser (existingUser: object) {
  
  try {
    const response = await fetch(`${API_URL}/api/auth/login`, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    credentials: "include",
    body: JSON.stringify(existingUser)
  });
  const data = await response.json();
  
  localStorage.setItem("token", data.token);
  await checkAuth();
  } catch (error) {
    console.error(error)
  }
  
  
}

async function checkAuth () {
  setLoadingUser(true);
  
  try {
    const token = localStorage.getItem("token");
  const response = await fetch(`${API_URL}/api/auth/check`, {
    credentials: "include",
    headers: {"Authorization": `Bearer ${token}`}
  })
  const data = await response.json();
 
  if (data.user) {
    setActiveUser(data.user);
  }
  if (!data.user) {
    setActiveUser(null);
  }
  setLoadingUser(false);
  } catch (error) {
    console.error(error)
    setLoadingUser(false);
  }
  

}

async function getTransactions () {
  
  try {
    const token = localStorage.getItem("token");
  const response = await fetch(`${API_URL}/api/transactions/get`, {
    headers: {"Authorization" : `Bearer ${token}`}
  })
  const data = await response.json();
 

  setTransactions(data.data);
  setLoadingTransaction(false);
  } catch (error) {
    console.error(error);
    setLoadingTransaction(false);
  }
  
  
}


async function addTransaction (newTransaction: object) {
  
  try {
    const token = localStorage.getItem("token")
  const response = await fetch(`${API_URL}/api/transactions/add`, {
    method: "POST",
    credentials: "include",
    headers: {"Content-Type": "application/json", "Authorization": `Bearer ${token}`},
    body: JSON.stringify(newTransaction)
  })
  const data = await response.json();

  setTransactions(prev => [...prev, data.data[0]])
  } catch (error) {
    console.error(error)
  }
  
  
}

async function deleteTransaction (id: number) {
  
  try {
   const token = localStorage.getItem("token")
  const response = await fetch(`${API_URL}/api/transactions/delete/${id}`, {
    method: "DELETE",
    headers: {"Authorization": `Bearer ${token}`},
    credentials: "include"
  })
  const data = await response.json();

  setTransactions(prev => prev.filter(transaction => transaction.id !== data.data[0].id)); 
  } catch (error) {
    console.error(error)
  }
  
  
}

async function updateTransaction (editedTransaction: object, id: number) {
  try {
    const token = localStorage.getItem("token")
  const response = await fetch(`${API_URL}/api/transactions/update/${id}`, {
    method: "PUT",
    headers: {"Content-Type": "application/json", "Authorization": `Bearer ${token}`},
    credentials: "include",
    body: JSON.stringify(editedTransaction)
  })
  const data = await response.json();

  setTransactions(prev => prev.map(transaction => {
    if (transaction.id === data.data[0].id) {
      return data.data[0]
    } else {
      return transaction
    }
  }))
  } catch (error) {
    console.error(error)
  }
  
  
}

async function addBudget (newBudget: object) {
  
  try {
    const token = localStorage.getItem("token")
  const response = await fetch(`${API_URL}/api/budgets/add`, {
    method: "POST",
    headers: {"Content-Type": "application/json", "Authorization": `Bearer ${token}`},
    credentials: "include",
    body: JSON.stringify(newBudget)
  })
  const data = await response.json();
 
  setBudgets(prev => [...prev, data.data[0]]);
  } catch (error) {
    console.error(error)
  }

  
}

async function getBudgets () {
  
  try {
   const token = localStorage.getItem("token")
  const response = await fetch(`${API_URL}/api/budgets/get`, {
    headers: {"Authorization": `Bearer ${token}`},
    credentials: "include"
  })
  const data = await response.json();

  setBudgets(data.data)
  setLoadingBudgets(false); 
  } catch (error) {
    console.error(error);
    setLoadingBudgets(false);
  }
  
  
}

async function deleteBudget (id: number) {
  
  try {
   const token = localStorage.getItem("token")
  const response = await fetch(`${API_URL}/api/budgets/delete/${id}`, {
    method: "DELETE",
    headers: {"Authorization": `Bearer ${token}`},
    credentials: "include"
  })
  const data = await response.json();
  console.log(data.data[0]);
  setBudgets(prev => prev.filter(budget => budget.id !== data.data[0].id)) 
  } catch (error) {
    console.error(error)
  }
  
  
}

async function updateBudget (editedBudget: object, id: number) {
  
  try {
    const token = localStorage.getItem("token");
  const response = await fetch(`${API_URL}/api/budgets/update/${id}`, {
    method: "PUT",
    headers: {"Content-Type": "application/json", "Authorization": `Bearer ${token}`},
    credentials: "include",
    body: JSON.stringify(editedBudget)
  });
  const data = await response.json();
  console.log(data.data[0]);
  setBudgets(prev => prev.map(budget => {
    if (budget.id === data.data[0].id) {
      return data.data[0]
    } else {
      return budget
    }
  }))
  } catch (error) {
    console.error(error)
  }
  
  
}

const [totalExpensesAndIncome, setTotalExpensesAndIncome] = useState(null);

async function getTotalExpensesAndIncome () {
  
  try {
    const token = localStorage.getItem("token")
  const response = await fetch(`${API_URL}/api/info/total-expenses-and-income`, {
    headers: {"Authorization": `Bearer ${token}`},
    credentials: "include"
  })
  const data = await response.json();
  console.log(data.data);
  setTotalExpensesAndIncome(data.data);
  setLoadingOverview(false);
  } catch (error) {
    console.error(error);
    setLoadingOverview(false)
  }

  
}

const [expCategorized, setExpCategorized] = useState([])
const [incomeCategorized, setIncomeCategorized] = useState([]);
const [loadingCategorized, setLoadingCategorized] = useState(true)

async function getExpAndIncCategorized () {
  
  try {
    const token = localStorage.getItem("token")
  const response = await fetch(`${API_URL}/api/info/expenses-and-income-by-category`, {
    headers: {"Authorization": `Bearer ${token}`},
    credentials: "include"
  })
  const data = await response.json();
  console.log(data.data, data.data2)
  setExpCategorized(data.data)
  setIncomeCategorized(data.data2)
  setLoadingCategorized(false);
  } catch (error) {
    console.error(error);
    setLoadingCategorized(false);
  }
  
  
}

const [expensesAndIncomeThisMonth, setExpensesAndIncomeThisMonth] = useState({});

async function getExpensesAndIncomeThisMonth() {
  try {
    const token = localStorage.getItem("token")
  const response = await fetch(`${API_URL}/api/info/expenses-and-income-within-last-month`, {
    headers: {"Authorization": `Bearer ${token}`},
    credentials: "include"
  })
  const data = await response.json();
  console.log(data.data);
  setExpensesAndIncomeThisMonth(data.data)
  } catch (error) {
    console.error(error)
  }
  
  
}

const [expensesAndIncomeLastMonth, setExpensesAndIncomeLastMonth] = useState({})

async function getExpensesAndIncomeLastMonth () {
  try {
     const token = localStorage.getItem("token")
  const response = await fetch(`${API_URL}/api/info/expenses-and-income-from-previous-month`, {
    headers: {"Authorization": `Bearer ${token}`},
    credentials: "include"
  })
  const data = await response.json();
  console.log(data.data);
  setExpensesAndIncomeLastMonth(data.data)
  } catch (error) {
    console.error(error)
  }
  
 
}

const [expenseTotalThisWeek, setExpenseTotalThisWeek] = useState({});

async function getExpenseTotalThisWeek () {
  
  try {
    const token = localStorage.getItem("token")
  const response = await fetch(`${API_URL}/api/info/expenses-this-week`, {
    headers: {"Authorization": `Bearer ${token}`},
    credentials: "include"
  })
  const data = await response.json();
  console.log(data.data)
  setExpenseTotalThisWeek(data.data)
  } catch (error) {
    console.error(error)
  }

  
}

const [expenseTotalPrevWeek, setExpenseTotalPrevWeek] = useState({});

async function getExpenseTotalPrevWeek () {
  
  try {
    const token = localStorage.getItem("token")
  const response = await fetch(`${API_URL}/api/info/expenses/prev/week`, {
    headers: {"Authorization": `Bearer ${token}`},
    credentials: "include"
  });
  const data = await response.json();
  console.log(data.data);
  setExpenseTotalPrevWeek(data.data)
  } catch (error) {
    console.error(error)
  }
  
  
}

const [expenseAmountPerDayLast7, setExpenseAmountPerDayLast7] = useState([]);

async function getExpenseAmountPerDayLast7 () {
  
  try {
    const token = localStorage.getItem("token")
  const response = await fetch(`${API_URL}/api/info/expense-amt-per-day`, {
    headers: {"Authorization": `Bearer ${token}`},
    credentials: "include"
  })
  const data = await response.json();
  console.log(data.data);
  setExpenseAmountPerDayLast7(data.data);
  } catch (error) {
    console.error(error)
  }
  
  
}

const [greatestExpenseThisWeek, setGreatestExpenseThisWeek] = useState({})
async function getGreatestExpenseThisWeek() {
  
  try {
    const token = localStorage.getItem("token")
  const response = await fetch(`${API_URL}/api/info/greatest-expense-this-week`, {
    headers: {"Authorization": `Bearer ${token}`},
    credentials: "include"
  })
  const data = await response.json();
  console.log(data.data)
  setGreatestExpenseThisWeek(data.data);
  } catch (error) {
    console.error(error)
  }
  
  
}

const [budgetComparisonInfo, setBudgetComparisonInfo] = useState([]);
async function getBudgetComparisonInfo () {
  try {
    const token = localStorage.getItem("token")
  const response = await fetch(`${API_URL}/api/info/budget-expense-comparison`, {
    headers: {"Authorization": `Bearer ${token}`},
    credentials: "include"
  })
  const data = await response.json();
  console.log(data.data);
  setBudgetComparisonInfo(data.data);
  } catch (error) {
    console.error(error)
  }
  

}

useEffect(() => {
  checkAuth()
}, [])



  return (
    <>
      <Routes>
        <Route path='/' element={
          <PublicRoute activeUser={activeUser} loadingUser={loadingUser}>
          <Signup addUser={handleAddUser} addedUser={addedUser}/>
          </PublicRoute>
          }/>
        <Route path='/login' element={
          <PublicRoute activeUser={activeUser} loadingUser={loadingUser}>
          <Login loginUser={loginUser}/>
          </PublicRoute>
          } />

        <Route path='/dashboard' element={
          
          <ProtectedRoute activeUser={activeUser} loadingUser={loadingUser}>
          <Dashboard loadingCategorized={loadingCategorized} loadingOverview={loadingOverview} getTotalExpensesAndIncome={getTotalExpensesAndIncome} totalExpensesAndIncome={totalExpensesAndIncome} getExpAndIncCategorized={getExpAndIncCategorized} expCategorized={expCategorized} incomeCategorized={incomeCategorized} getExpensesAndIncomeThisMonth={getExpensesAndIncomeThisMonth} expensesAndIncomeThisMonth={expensesAndIncomeThisMonth} getExpensesAndIncomeLastMonth={getExpensesAndIncomeLastMonth} expensesAndIncomeLastMonth={expensesAndIncomeLastMonth} getExpenseTotalThisWeek={getExpenseTotalThisWeek} expenseTotalThisWeek={expenseTotalThisWeek} getExpenseTotalPrevWeek={getExpenseTotalPrevWeek} expenseTotalPrevWeek={expenseTotalPrevWeek} getExpenseAmountPerDayLast7={getExpenseAmountPerDayLast7} expenseAmountPerDayLast7={expenseAmountPerDayLast7} getGreatestExpenseThisWeek={getGreatestExpenseThisWeek} greatestExpenseThisWeek={greatestExpenseThisWeek} getBudgetComparisonInfo={getBudgetComparisonInfo} budgetComparisonInfo={budgetComparisonInfo}/>
          </ProtectedRoute>
          } />
        
        <Route path='/transactions' element={
          <ProtectedRoute activeUser={activeUser} loadingUser={loadingUser}>
            <Transactions loadingTransactions={loadingTransactions} transactions={transactions} addTransaction={addTransaction} deleteTransaction={deleteTransaction} getTransactions={getTransactions} updateTransaction={updateTransaction}/>
          </ProtectedRoute>
        }/>

        <Route path='/budgets' element={
          <ProtectedRoute activeUser={activeUser} loadingUser={loadingUser}>
            <Budgets loadingBudgets={loadingBudgets} budgets={budgets} getBudgets={getBudgets} addBudget={addBudget} deleteBudget={deleteBudget} updateBudget={updateBudget}/>
          </ProtectedRoute>

        }
        
        />

        <Route path='/info' element={
          <PublicRoute activeUser={activeUser} loadingUser={loadingUser}>
            <Info />
          </PublicRoute>
        }/>
      </Routes>
    </>
  )
}

export default App
