'use client'

import Link from 'next/link'
import PokemonCard from '@/components/pokemon-card'

export default function Home() {
  return (
    <div className='flex justify-center p-4 md:p-8'>
      <div className='flex flex-col items-center gap-8 md:flex-row md:gap-8 md:p-8'>
        <div className='flex flex-col gap-8 md:items-center'>
          <h1 className='text-4xl font-bold md:text-6xl'>Pokedex</h1>
          <p className='max-w-full text-base font-light leading-7 md:max-w-xl md:text-lg'>
            Choose your own strategies and journalize your trades with ease
          </p>
        </div>
      </div>
    </div>
  )
}

