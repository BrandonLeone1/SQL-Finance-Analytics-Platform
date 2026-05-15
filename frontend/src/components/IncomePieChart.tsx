import { Link } from "react-router-dom";
import { PieChart, Pie, Legend, Tooltip, ResponsiveContainer,  } from "recharts";

export default function IncomePieChart({incomeCategorized, loadingCategorized}) {
    
   if (loadingCategorized) {
    return (
        <div className="w-full h-93.75 flex flex-col gap-4 items-center justify-center">
            <div className="w-43.75 h-43.75 rounded-[50%] mx-auto bg-slate-300">

                </div>
                
               
        </div>
    )
   }
   
    if (incomeCategorized.length < 1) {
    return (
        <>
            <div className="w-full h-93.75">
                 <p className="font-medium text-sm">Total income breakdown</p>
                <div className="h-full flex flex-col gap-4 mx-auto text-center justify-center">    
                   
                    <p className="">Add income sources on the <Link to={`/transactions`} className="underline hover:opacity-75 duration-150 text-indigo-400">transactions page,</Link></p>
                    <p>Unlock a pie chart breakdown!</p>
                </div>
            </div>
        
        </>
    )
}


    const colors = [
  "#5B8FF9", // soft blue (primary income)
  "#61DDAA", // teal green (growth)
  "#65789B", // slate blue-gray
  "#7262FD", // muted purple
  "#78D3F8", // light sky blue
  "#9661BC", // soft violet
  "#2FB8A0", // deep aqua
  "#4C9F70", // muted success green
  "#8FB8D8", // dusty blue
  "#A29BFE"  // soft lavender
];

    const formattedData = incomeCategorized.map((entry,index) => {
        return {
            ...entry,
            sum: Number(entry.sum),
            fill: colors[index % colors.length]
        }
    })

    const usdFormatter = new Intl.NumberFormat('en-US', {
        style: "currency",
        currency: "USD"
    })
    
    return (
        <>
            <div style={{ width: "100%", height: 375}}>
                <p className="text-sm font-medium -mb-6">Total income breakdown</p>
                <ResponsiveContainer width={`100%`} height={400}>
                    <PieChart>
                        <Pie 
                        label={({percent}) => `${(percent * 100).toFixed(1)}%`}
                        data={formattedData} dataKey={`sum`} nameKey={`category`} cx={`50%`} cy={`50%`} outerRadius={80} innerRadius={40}>

                        </Pie>
                        <Tooltip formatter={(value) => `${usdFormatter.format(value)}`} />

                        <Legend 
                        verticalAlign="bottom"
                        
                        />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </>
    )
}