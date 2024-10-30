'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Github, Twitter, Youtube, Instagram, Moon, Sun } from 'lucide-react'

const AnimatedBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId: number

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const drawDots = (time: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const isDark = document.documentElement.classList.contains('dark')
      ctx.fillStyle = isDark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)'

      const spacing = 18
      const amplitude = 4
      const frequency = 0.001

      for (let x = 0; x < canvas.width; x += spacing) {
        for (let y = 0; y < canvas.height; y += spacing) {
          const offsetX = Math.sin(time * frequency + y * 0.1) * amplitude
          const offsetY = Math.cos(time * frequency + x * 0.1) * amplitude
          ctx.beginPath()
          ctx.arc(x + offsetX, y + offsetY, 1, 0, 2 * Math.PI)
          ctx.fill()
        }
      }

      animationFrameId = requestAnimationFrame((t) => drawDots(t))
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)
    drawDots(0)

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed inset-0 z-0" />
}

export default function HomePage() {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    // Initialize theme from localStorage or system preference
    const savedTheme = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    
    setIsDark(savedTheme === 'dark' || (!savedTheme && prefersDark))
  }, [])

  useEffect(() => {
    // Update document class and localStorage when theme changes
    if (isDark) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }, [isDark])

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 relative transition-colors duration-300">
      <AnimatedBackground />
      
      {/* Content wrapper */}
      <div className="relative z-10 p-8">
        {/* Corner Image */}
        <div className="absolute top-0 left-0 w-52 h-52 transition-[filter] duration-300 dark:invert dark:brightness-90">
          <Image
            src="/mr_di_haviland_tr.gif"
            alt="Corner Decoration"
            layout="fill"
            objectFit="contain"
          />
        </div>

        <header className="flex justify-end items-center mb-12 pt-12">
          <nav className="flex items-center space-x-4">
          <Link href="https://github.com" className="hover:text-gray-600 dark:hover:text-gray-400"><Github /></Link>
            <Link href="/blog" className="hover:underline">Blog</Link>
            <Link href="/projects" className="hover:underline">Projects</Link>
            <button
              onClick={() => setIsDark(!isDark)}
              className="p-2 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-full transition-colors"
              aria-label="Toggle theme"
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </nav>
        </header>
        
        <main className="max-w-2xl mx-auto">
          <h1 className="text-4xl font-bold mb-4"style={{ fontSize: '3em' }}>Muktai Patil</h1>
          <h2 className="text-xl font-semibold mb-4" style={{ fontSize: '1.5em' }}>Senior Software Engineer</h2>
          <p className="mb-4">Hey, I am a passionate developer working at the cross section of big data and backend systems.
          
          </p>
          
          <section className="mb-8 flex items-center">
            <p>Dreaming up ideas and making them come true is where my passion lies.</p>
          </section>
          <section className="mb-8 flex items-center">
            <p>My Day to day work revolves around supply chain management project for a client which is UK Based Automobile Company</p>
          </section>

          <section className="mb-8 flex items-center">
          <h2 className="text-xl font-semibold mb-0 mr-2">Currently Working at</h2>
            <Image src="/tcs.svg" alt="TCS" width={100} height={100}/>
            </section>

          
          
          
          <section className="mb-8 flex items-center">
            <p>I'm Currently working on </p>
            <Image src="/python.svg" alt="PY" width={50} height={50}/>
            <Image src="/bq.svg" alt="BQ" width={80} height={80}/>
            <Image src="/sql.svg" alt="SQL" width={50} height={50}/>
          </section>

          <section className="mb-8 flex items-center">
            <p>I've also Previously worked upon</p>
            <Image src="/java.svg" alt="Java" width={40} height={40}/>
            <Image src="/spring.svg" alt="SP" width={30} height={30}/>
            <Image src="/gcp.svg" alt="SQL" width={40} height={40}/>
          </section>

          <section className="mb-8">
            <p>Outside of programming, I enjoy doing Cooking and traveling.</p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-2">Find me on</h2>
            <div className="flex space-x-4">
              <Link href="https://github.com" className="hover:text-gray-600 dark:hover:text-gray-400"><Github /></Link>
              <Link href="https://twitter.com" className="hover:text-gray-600 dark:hover:text-gray-400"><Twitter /></Link>
              <Link href="https://youtube.com" className="hover:text-gray-600 dark:hover:text-gray-400"><Youtube /></Link>
              <Link href="https://instagram.com" className="hover:text-gray-600 dark:hover:text-gray-400"><Instagram /></Link>
            </div>
          </section>
          
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-2">Or mail me at</h2>
            <p>muktaipatil04@gmail.com</p>
          </section>
          
          
        </main>
      </div>
    </div>
  )
}