import React from 'react'

interface IProgressCircle {
  children: { (progress: number): React.ReactNode } | React.ReactNode
  progress: number
  secondaryColor?: string
  secondaryWidth?: number
  size: number
  strokeColor: string
  strokeWidth?: number
}
const ProgressCircle = ({
  children,
  progress,
  secondaryColor,
  secondaryWidth = 7,
  size,
  strokeColor,
  strokeWidth = 10,
}: IProgressCircle) => {
  const [offset, setOffset] = React.useState(0)

  const circleRef = React.useRef<SVGCircleElement>(null)

  const center = size / 2
  const radius = size / 2 - strokeWidth / 2
  const circumference = 2 * Math.PI * radius

  React.useEffect(() => {
    const progressOffset = ((100 - progress) / 100) * circumference
    setOffset(progressOffset)
    if (circleRef.current !== null) {
      circleRef.current.style.transition = 'stroke-dashoffset 250ms ease-out'
    }
  }, [circumference, progress])

  return (
    <div
      style={{
        display: 'flex',
        height: size,
        justifyContent: 'center',
        position: 'relative',
        width: size,
      }}
    >
      <svg width={size} height={size}>
        <SvgCircle
          center={center}
          isBackground
          offset={offset}
          radius={radius}
          strokeColor={secondaryColor}
          strokeWidth={secondaryWidth}
        />
        <SvgCircle
          center={center}
          offset={offset}
          radius={radius}
          circumference={circumference}
          ref={circleRef}
          strokeColor={strokeColor}
          strokeWidth={strokeWidth}
        />
      </svg>
      <div
        style={{
          alignItems: 'center',
          borderRadius: 100,
          bottom: 0,
          display: 'flex',
          height: size - strokeWidth * 2,
          justifyContent: 'center',
          left: 0,
          margin: 'auto',
          overflow: 'hidden',
          position: 'absolute',
          right: 0,
          textAlign: 'center',
          top: 0,
          width: size - strokeWidth * 2,
        }}
      >
        {typeof children === 'function' ? children(progress) : children}
      </div>
    </div>
  )
}

interface ISvgCircle {
  center: number
  circumference?: number
  isBackground?: boolean
  offset: number
  radius: number
  strokeColor?: string
  strokeWidth: number
}
const SvgCircle = React.forwardRef<SVGCircleElement, ISvgCircle>(
  (
    {
      center,
      circumference,
      isBackground,
      offset,
      radius,
      strokeColor,
      strokeWidth,
    },
    ref
  ) => (
    <circle
      cx={center}
      cy={center}
      fill='none'
      r={radius}
      ref={ref}
      stroke={strokeColor}
      strokeDasharray={circumference}
      strokeDashoffset={offset}
      strokeWidth={strokeWidth}
      transform={!isBackground ? `rotate(-90 ${center} ${center})` : 'initial'}
    />
  )
)

export default ProgressCircle
