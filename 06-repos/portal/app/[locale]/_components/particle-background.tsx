'use client'

import { useEffect, useRef } from 'react'

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouse = useRef({ x: -1000, y: -1000 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId: number
    let particles: Particle[] = []

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    class Particle {
      x: number
      y: number
      originX: number
      originY: number
      size: number
      color: string
      vx: number
      vy: number
      force: number
      angle: number
      distance: number
      friction: number
      ease: number

      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.originX = this.x
        this.originY = this.y
        this.size = Math.random() * 2 + 1
        this.color = Math.random() > 0.5 ? '#6366f1' : '#a5b4fc' // Indigo & Slate
        this.vx = 0
        this.vy = 0
        this.force = 0
        this.angle = 0
        this.distance = 0
        this.friction = 0.95
        this.ease = 0.05
      }

      update() {
        // 1. 自动流向中心 (象征资源汇聚到中国枢纽)
        const centerX = canvas.width / 2
        const centerY = canvas.height / 2
        const dxCenter = centerX - this.x
        const dyCenter = centerY - this.y
        const distCenter = Math.sqrt(dxCenter * dxCenter + dyCenter * dyCenter)
        
        // 核心吸引力
        this.vx += (dxCenter / distCenter) * 0.05
        this.vy += (dyCenter / distCenter) * 0.05

        // 2. 鼠标互动 (象征资源调度)
        const dxMouse = mouse.current.x - this.x
        const dyMouse = mouse.current.y - this.y
        const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse)
        
        if (distMouse < 150) {
          this.force = (150 - distMouse) / 150
          this.vx += (dxMouse / distMouse) * this.force * 2 // 吸引到鼠标
          this.size = 3 // 变亮
        } else {
          this.size = Math.random() * 2 + 1
        }

        // 3. 应用物理
        this.x += this.vx
        this.y += this.vy
        this.vx *= this.friction
        this.vy *= this.friction

        // 边界循环
        if (this.x < 0) this.x = canvas.width
        if (this.x > canvas.width) this.x = 0
        if (this.y < 0) this.y = canvas.height
        if (this.y > canvas.height) this.y = 0
      }

      draw() {
        if (!ctx) return
        ctx.fillStyle = this.color
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    const init = () => {
      particles = []
      const particleCount = Math.min(window.innerWidth / 10, 150) // 动态粒子数量
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle())
      }
    }

    const animate = () => {
      // 尾迹效果 (象征流动感)
      ctx.fillStyle = 'rgba(2, 6, 23, 0.1)' // Slate-950 with trail
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      
      particles.forEach((p) => {
        p.update()
        p.draw()
      })

      // 绘制中国枢纽核心光点
      const gradient = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, 0,
        canvas.width / 2, canvas.height / 2, 100
      )
      gradient.addColorStop(0, 'rgba(99, 102, 241, 0.2)')
      gradient.addColorStop(1, 'rgba(2, 6, 23, 0)')
      ctx.fillStyle = gradient
      ctx.beginPath()
      ctx.arc(canvas.width / 2, canvas.height / 2, 100, 0, Math.PI * 2)
      ctx.fill()

      animationFrameId = requestAnimationFrame(animate)
    }

    const onMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX
      mouse.current.y = e.clientY
    }

    window.addEventListener('resize', resize)
    window.addEventListener('mousemove', onMouseMove)
    
    resize()
    init()
    animate()

    return () => {
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMouseMove)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0 pointer-events-none"
    />
  )
}
