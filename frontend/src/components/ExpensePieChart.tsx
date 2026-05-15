
import { Link } from "react-router-dom";
import { PieChart, Pie, Legend, Tooltip, ResponsiveContainer,  } from "recharts";
export default function ExpensePieChart({expCategorized, loadingCategorized}) {
    
     if (loadingCategorized) {
    return (
       <div className="w-full h-93.75 flex flex-col gap-4 items-center justify-center">
            <div className="w-43.75 h-43.75 rounded-[50%] mx-auto bg-slate-300">

                </div>
                
               
        </div>
    )
   }


    const colors = [
  "#E07A5F", // coral
  "#F28482", // soft salmon
  "#C97C5D", // clay orange
  "#B56576", // muted rose
  "#A44A3F", // brick red
  "#E29578", // terracotta
  "#D4A373", // warm sand
  "#8D6E63", // earthy brown
  "#F2CC8F", // soft beige accent
  "#D66A6A"  // dusty red
];

if (expCategorized.length < 1) {
    return (
        <>
            <div className="w-full h-93.75">
                 <p className="font-medium text-sm">Total expense breakdown</p>
                <div className="h-full flex flex-col gap-4 mx-auto text-center justify-center">    
                   
                    <p className="">Add expenses on the <Link to={`/transactions`} className="underline hover:opacity-75 duration-150 text-indigo-400">transactions page,</Link></p>
                    <p>Unlock a pie chart breakdown!</p>
                </div>
            </div>
        
        </>
    )
}

    const formattedData = expCategorized.map((entry,index) => {
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
                <p className="font-medium text-sm -mb-6">Total expense breakdown</p>
                <ResponsiveContainer width={`100%`} height={400}>
                    <PieChart>
                        <Pie 
                        label={({percent}) => `${(percent * 100).toFixed(1)}%`}
                        data={formattedData} dataKey={`sum`} nameKey={`category`} cx={`50%`} cy={`50%`} outerRadius={80} innerRadius={40}>

                        </Pie>
                        <Tooltip formatter={(value) => `${usdFormatter.format(value)}`}/>

                        <Legend 
                        verticalAlign="bottom"
                        
                        />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </>
    )
}