const ContactsContainer = () => {
  return (
    <div className="relative md:w-[35vw] lg:w-[30vw] xl:w-[20vw] bg-[#1b1c24] border-r-2 border-[#2f303b] w-full">
        <div className="pt-1">
          <Logo />
        </div>
        <div className="my-2">
          <div className="flex items-center justify-between pr-10">
            <Title text={"Direct Message"}/>
          </div>
        </div>
        <div className="my-2">
          <div className="flex items-center justify-between pr-10">
            <Title text={"Channels"}/>
          </div>
        </div>
    </div>
  )
}

const Logo = () => {
  return (
    <div className="flex p-5 justify-start items-center gap-2">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 700 200">
        <g transform="translate(0, 0)">
          <circle cx="100" cy="100" r="90" fill="#8417FF" />
          <path d="M60 70 L140 70 L100 130 Z" fill="#ffffff" opacity="0.9" />
          <circle cx="100" cy="85" r="15" fill="#2980b9" />
          <path d="M40 100 Q100 150 160 100" stroke="#ffffff" stroke-width="4" fill="none" opacity="0.6" />
          <circle cx="100" cy="100" r="60" stroke="#ffffff" stroke-width="2" fill="none" opacity="0.3" />
        </g>
        <g transform="translate(200, 100)">
          <text font-family="Arial, sans-serif" font-weight="bold" font-size="36">
            <tspan fill="#9852e9">Privato</tspan>
            <tspan x="120" fill="#9852e9">Sphere</tspan>
          </text>
        </g>
      </svg>
    </div>
  )
}

const Title = ({text}) => {
  return(
    <h6 className="uppercase tracking-widest text-neutral-400 pl-10 font-light text-opacity-90 text-sm">{text}</h6>
  )
}

export default ContactsContainer;