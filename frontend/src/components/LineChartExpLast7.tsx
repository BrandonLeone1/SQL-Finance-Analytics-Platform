import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";
import { Link } from "react-router-dom";


export default function LineChartExpLast7({expenseAmountPerDayLast7}) {
    
    if (expenseAmountPerDayLast7.length < 1) {
        return (
            <div className="w-full h-100 bg-slate-200 rounded-lg p-6">
                <p className="font-medium text-sm">Expenses per day (last 7 days)</p>
                <div className="h-full flex flex-col gap-4 mx-auto text-center justify-center">    
                   
                    <p className="">Add expenses on the <Link to={`/transactions`} className="underline hover:opacity-75 duration-150 text-indigo-400">transactions page,</Link></p>
                    <p>Unlock a rolling 7 day line chart!</p>
                </div>
            </div>
        )
    }

    const formattedData = expenseAmountPerDayLast7.map(entry => {
        return {
            ...entry,
            date_of_transaction: entry.date_of_transaction.split("T")[0],
            sum: Number(entry.sum)
        }
    })
    
    const usdFormatter = new Intl.NumberFormat('en-US', {
        style: "currency",
        currency: "USD"
    })
    return (
        <>

        <div style={{ width: "100%", height: 400 }}>
              <ResponsiveContainer width={'100%'} height={400}>
                <LineChart data={formattedData}>
                    <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date_of_transaction" />
                        <YAxis />
                        <Tooltip formatter={(value) => `${usdFormatter.format(value)}`}/>
                        <Legend />
                        <Line
                        type="monotone"
                        dataKey="sum"
                        name="Expenses"
                        stroke="#8884d8"
                        strokeWidth={2}
                        />
                </LineChart>
              </ResponsiveContainer>
        </div>
        
        </>
    )
}