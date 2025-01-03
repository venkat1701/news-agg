import React from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline'
}

export function Button({ children, variant = 'default', className = '', ...props }: ButtonProps) {
  const baseStyles = 'px-4 py-2 rounded transition-colors'
  const variantStyles = {
    default: 'bg-blue-600 text-white hover:bg-blue-700',
    outline: 'bg-transparent text-blue-600 border border-blue-600 hover:bg-blue-100'
  }

  const combinedClassName = `${baseStyles} ${variantStyles[variant]} ${className}`

  return (
    <button className={combinedClassName} {...props}>
      {children}
    </button>
  )
}
