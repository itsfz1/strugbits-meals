interface BannerProps {
  title: string
  subtitle: string
  backgroundImage: string
}

const Banner = ({
  title,
  subtitle,
  backgroundImage = "https://images.unsplash.com/photo-1555072956-7758afb20e8f?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
}: BannerProps) => {
  return (
    <div className="relative w-full h-72 overflow-hidden">
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${backgroundImage})` }} />
      <div className="absolute inset-0 bg-white bg-opacity-70" />
      <div className="relative h-full flex flex-col justify-center items-center text-center px-4">
        <h1 className="text-black text-5xl font-bold mb-2">{title}</h1>
        <p className="text-black text-sm font-semibold mt-3">{subtitle}</p>
      </div>
    </div>
  )
}
export default Banner
