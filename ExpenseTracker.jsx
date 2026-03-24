import React, { useState, useEffect } from 'react'

const ExpenseTracker = () => {

    const [Expense, setExpense] = useState("")
    const [ExpenseAmount, setExpenseAmount] = useState("")
    const [type , settype] = useState("")
    const [Expenses, setExpenses] = useState([])
    const [Filter, setFilter] = useState("")

    useEffect(() => {
        const saved = localStorage.getItem("Expenses");
        if (saved) setExpenses(JSON.parse(saved));
    }, []);

    useEffect(() => {
        localStorage.setItem("Expenses", JSON.stringify(Expenses));
    }, [Expenses]);

    const AddExpense = () => {
      if(Expense.trim() === "" || ExpenseAmount === "") return

      setExpenses([...Expenses, 
        {
         id:Date.now(), 
         Title: Expense,
         Amount: parseFloat(ExpenseAmount),
         category: type || "General"
        }
      ])

      setExpense("")
      setExpenseAmount("")
      settype("")
    }

    const DeleteExpense = (id) => {
      setExpenses(Expenses.filter((t) => t.id !== id));
    }

    const FilteredExpense = Expenses.filter((t) =>
      (t.category || "").toLowerCase().includes(Filter.toLowerCase()) ||
      (t.Title || "").toLowerCase().includes(Filter.toLowerCase())
    );

    const Total = Expenses.map(e => Number(e.Amount) || 0).reduce((sum , num) => sum + num, 0);

return (
  <div className='min-h-screen bg-gradient-to-br from-gray-100 via-gray-200 to-gray-100 flex items-center justify-center p-4'>

    <div className='w-full max-w-xl bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-6 border border-gray-200 transition-all duration-500 hover:shadow-3xl'>
      
      <h1 className="text-3xl font-semibold text-gray-800 mb-6 text-center tracking-tight">
          Expense Tracker
      </h1>

       <div className="flex flex-col gap-3 mb-5">

        <input
        type="text"
        placeholder="Expense title..."
        value={Expense}
        onChange={(e) => setExpense(e.target.value)}
        className="border border-gray-200 p-3 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-gray-300 transition"
        />
        
        <input 
        type="number"
        placeholder="Amount..."
        value={ExpenseAmount}
        onChange={(e) => setExpenseAmount(e.target.value)}
        className="border border-gray-200 p-3 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-gray-300 transition"
        />
        
        <input
        type="text"
        placeholder="Category (Food, Travel...)"
        value={type}
        onChange={(e) => settype(e.target.value)}
        className="border border-gray-200 p-3 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-gray-300 transition"
        />

        <button 
        onClick={AddExpense} 
        className="w-full bg-gradient-to-r from-gray-800 to-gray-600 text-white p-3 rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-md"
        >
          Add Expense
        </button>

        <div className="w-full bg-gradient-to-r from-gray-50 to-gray-100 text-gray-700 p-3 rounded-xl text-center font-semibold shadow-inner">
          Total: ₹{Total}
        </div>

        <input
        placeholder="Search by title or category..."
        value={Filter}
        onChange={(e) => setFilter(e.target.value)}
        className="border border-gray-200 p-3 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-gray-300 transition"
        />
        
        </div>

        <ul className='space-y-3 max-h-80 overflow-y-auto pr-1'>
          {FilteredExpense.length === 0 && (
            <p className="text-center text-gray-400">No expenses found</p>
          )}

          {FilteredExpense.map((e) => (
            <li key={e.id} className="flex justify-between items-center bg-white border border-gray-200 p-4 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
              
               <div className="flex flex-col">
                 <span className="text-gray-800 font-medium">{e.Title}</span>
                 <small className="text-gray-400 text-xs">{e.category}</small> 
               </div>
               
               <div className="flex items-center gap-4">
                <span className="text-gray-700 font-semibold">₹{e.Amount}</span>
                <button onClick={() => DeleteExpense(e.id)} className="text-gray-400 hover:text-red-500 transition text-lg ">Delete</button>  
              </div>
              
            </li>
          ))}

        </ul>
    </div>
  </div>
)
}

export default ExpenseTracker
