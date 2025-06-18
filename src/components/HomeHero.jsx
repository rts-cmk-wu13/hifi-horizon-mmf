import HeroImg from '../assets/hero.png'
export default function HomeHero() {

    return (
        <figure className='w-full overflow-hidden '>
            <img className='w-full object-cover h-[39.688rem]' src={HeroImg} alt="" />
        </figure>
    )
}