'use client'

import { useState, useEffect } from 'react'
import Layout from '@/components/Layout'
import ExpenseInput from '@/components/ExpenseInput'
import ExpenseList from '@/components/ExpenseList'
import Dashboard from '@/components/Dashboard'
import Settings from '@/components/Settings'
import EditExpensePage from '@/components/EditExpensePage'
import StatsPage from '@/components/StatsPage'
import { Expense, ViewState } from '@/types'
import { loadExpenses, saveExpenses } from '@/utils/storage'
import { usePWA } from '@/hooks/usePWA'


const generateId = () => Math.random().toString(36).substring(2, 9)

export default function Home() {
  usePWA() // Initialize PWA
  
  const [view, setView] = useState<ViewState>('HOME')
  const [expenses, setExpenses] = useState<Expense[]>([])
  const [selectedExpense, setSelectedExpense] = useState<Expense | null>(null)

  useEffect(() => {
    const data = loadExpenses()
    setExpenses(data)
  }, [])

  useEffect(() => {
    saveExpenses(expenses)
  }, [expenses])

  const handleAddExpense = (newExpenseData: Omit<Expense, 'id'>) => {
    const newExpense: Expense = {
      ...newExpenseData,
      id: generateId()
    }
    setExpenses(prev => [newExpense, ...prev])
    // Haptic feedback
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      navigator.vibrate([10, 30, 10])
    }
  }

  const handleEditExpense = (updatedExpense: Expense) => {
    setExpenses(prev => prev.map(e => e.id === updatedExpense.id ? updatedExpense : e))
  }

  const handleDeleteExpense = (id: string) => {
    setExpenses(prev => prev.filter(e => e.id !== id))
  }

  const handleImportData = (data: Expense[]) => {
    setExpenses(data)
    setView('HOME')
  }

  const handleClearData = () => {
    if (window.confirm("CẢNH BÁO: Hành động này không thể hoàn tác. Bạn chắc chắn muốn xóa toàn bộ dữ liệu?")) {
      setExpenses([])
      setView('HOME')
    }
  }

  const handleEditClick = (expense: Expense) => {
    setSelectedExpense(expense)
    setView('EDIT')
  }

  const handleBackFromEdit = () => {
    setSelectedExpense(null)
    setView('HOME')
  }

  return (
    <Layout activeTab={view} onTabChange={setView}>
      {view === 'HOME' && (
        <>
          {/* Main content container with animation */}
          <div className="space-y-8 animate-float-up">
            {/* 1. Dashboard Section */}
            <section>
              <Dashboard expenses={expenses} />
            </section>

            {/* 2. List Section */}
            <section>
              <ExpenseList 
                expenses={expenses} 
                onDelete={handleDeleteExpense} 
                onEdit={handleEditExpense}
                onEditClick={handleEditClick}
              />
            </section>
          </div>
          
          {/* 3. Floating Input - Moved OUTSIDE the animated div to ensure 'fixed' positioning works correctly */}
          <ExpenseInput onAdd={handleAddExpense} />
        </>
      )}

      {view === 'SETTINGS' && (
        <Settings 
          expenses={expenses} 
          onImport={handleImportData} 
          onClear={handleClearData}
          onBack={() => setView('HOME')}
          onNavigateToStats={() => setView('STATS')}
        />
      )}

      {view === 'EDIT' && selectedExpense && (
        <EditExpensePage
          expense={selectedExpense}
          onSave={handleEditExpense}
          onDelete={handleDeleteExpense}
          onBack={handleBackFromEdit}
        />
      )}

      {view === 'STATS' && (
        <StatsPage
          expenses={expenses}
          onBack={() => setView('SETTINGS')}
        />
      )}
    </Layout>
  )
}
