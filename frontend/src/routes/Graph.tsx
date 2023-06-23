import Layout from '@/components/reactCola'
import { Box } from '@mantine/core'
import { useState } from 'react'
import { Line } from 'react-lineto'

export default function Graph() {
  const [bounds, setBounds] = useState({ xMin: 0, yMin: 0, xMax: 0, yMax: 0 })
  return (
    <Box
      style={{ border: '1px solid red', background: 'gray', height: '100%' }}
      ref={(el) => {
        if (!el) return
        console.log('initial width', el.getBoundingClientRect().width)
        let prevValue = JSON.stringify(el.getBoundingClientRect())
        const start = Date.now()
        const handle = setInterval(() => {
          const rect = el.getBoundingClientRect()
          const nextValue = JSON.stringify(rect)
          if (nextValue === prevValue) {
            clearInterval(handle)
            console.log(
              `width stopped changing in ${Date.now() - start}ms. final width:`,
              rect.width,
            )
            // setBounds(rect.left, rect.top, rect.right, rect.bottom)
            console.log('bounds', rect.left, rect.top, rect.right, rect.bottom)
            console.log(bounds)
          } else {
            prevValue = nextValue
          }
        }, 100)
      }}
    >
      <Layout
        // width={40}
        // height={40}
        ref={(el) => {
          if (!el) return
          console.log('initial graph width', el.getBoundingClientRect().width)
          let prevValue = JSON.stringify(el.getBoundingClientRect())
          const start = Date.now()
          const handle = setInterval(() => {
            const rect = el.getBoundingClientRect()
            const nextValue = JSON.stringify(rect)
            if (nextValue === prevValue) {
              clearInterval(handle)
              console.log(
                `graph width stopped changing in ${Date.now() - start}ms. final width:`,
                rect.width,
              )
              // setBounds(rect.left, rect.top, rect.right, rect.bottom)
              console.log('bounds', rect.left, rect.top, rect.right, rect.bottom)
              console.log(bounds)
            } else {
              prevValue = nextValue
            }
          }, 100)
        }}
        renderLayout={(layout) => (
          <>
            {layout.groups().map(({ bounds: { x, X, y, Y } }, i) => {
              const width = X - x
              const height = Y - y
              return (
                <div
                  key={i}
                  style={{
                    position: 'absolute',
                    left: x,
                    top: y,
                    width,
                    height,
                    backgroundColor: 'orange',
                    borderRadius: 10,
                    zIndex: 0,
                  }}
                />
              )
            })}
            {layout.links().map(({ source, target }, i) => {
              const { x, y } = source
              const { x: x2, y: y2 } = target
              return <Line key={i} x0={x} y0={y} x1={x2} y1={y2} borderColor='blue' zIndex={1} />
            })}
            {layout.nodes().map(({ x, y, width, height, name }, i) => (
              <div
                key={i}
                style={{
                  position: 'absolute',
                  left: x - width * 0.5,
                  top: y - height * 0.5,
                  width,
                  height,
                  backgroundColor: 'red',
                  borderRadius: 5,
                  zIndex: 2,
                }}
              >
                {name}
              </div>
            ))}
          </>
        )}
        nodes={[
          {
            width: 60,
            height: 40,
            name: 'a',
          },
          {
            width: 60,
            height: 40,
            name: 'b',
          },
          {
            width: 60,
            height: 40,
            name: 'c',
          },
          {
            width: 60,
            height: 40,
            name: 'd',
          },
          {
            width: 60,
            height: 40,
            name: 'e',
          },
          {
            width: 60,
            height: 40,
            name: 'f',
          },
          {
            width: 60,
            height: 40,
            name: 'g',
          },
        ]}
        links={[
          { source: 1, target: 2 },
          { source: 2, target: 3 },
          { source: 3, target: 4 },
          { source: 0, target: 1 },
          { source: 2, target: 0 },
          { source: 3, target: 5 },
          { source: 0, target: 5 },
        ]}
        groups={[{ leaves: [0], groups: [1] }, { leaves: [1, 2] }, { leaves: [3, 4] }]}
        width={540}
        height={760}
      />
    </Box>
  )
}
