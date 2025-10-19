'use client'

import React, { useState } from 'react'

interface HeaderProps {
  onMenuToggle: () => void
  isMenuOpen: boolean
}

export default function Header({ onMenuToggle, isMenuOpen }: HeaderProps) {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Mobile menu button */}
          <button
            onClick={onMenuToggle}
            className="lg:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-blue"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          
          {/* Logo - hidden on mobile when sidebar is open */}
          <div className={`${isMenuOpen ? 'hidden' : 'block'} lg:block`}>
            <h1 className="text-xl font-bold text-primary-blue">PagueMenos</h1>
          </div>
          
          {/* User info */}
          <div className="flex items-center space-x-4">
            <div className="hidden sm:block text-right">
              <p className="text-sm font-medium text-gray-900">Farmacêutico</p>
              <p className="text-xs text-gray-500">Sistema de Protocolos</p>
            </div>
            <div className="w-8 h-8 bg-primary-blue rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-semibold">F</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}