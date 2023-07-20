/* eslint-disable no-unused-vars */
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper'
import Switch from '../../../components/switch/Switch'
import useFetch from '../../../hooks/useFetch'
import {useState} from 'react'
import Carousel from '../../../components/carousel/Carousel'
const Trending = () => {
    const [endpoint,setEndpoint] = useState('day')
    const handleSwitch = (option) =>{
      if(option === 'Day')
      {
        setEndpoint('day')
      }
      else
      setEndpoint('week')
    }
    const {data,isLoading,error} = useFetch(`/trending/all/${endpoint}`)

  return (
    <div className='carouselSection'>
      <ContentWrapper>
        <h3 className='carouselTitle'>Trending</h3>
        <Switch options={['Day','Week']} handleSwitch={handleSwitch}/>
      </ContentWrapper>
      <Carousel data={data} isLoading={isLoading}/>
    </div>
  )
}

export default Trending