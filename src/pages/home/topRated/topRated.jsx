/* eslint-disable no-unused-vars */
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper'
import Switch from '../../../components/switch/Switch'
import useFetch from '../../../hooks/useFetch'
import {useState} from 'react'
import Carousel from '../../../components/carousel/Carousel'
const TopRated = () => {
    const [endpoint,setEndpoint] = useState('movie')
    const handleSwitch = (option) =>{
      if(option === 'TV Shows')
      {
        setEndpoint('tv')
      }
      else
      setEndpoint('movie')
    }
    const {data,isLoading,error} = useFetch(`/${endpoint}/top_rated`)

  return (
    <div className='carouselSection'>
      <ContentWrapper>
        <h3 className='carouselTitle'>Top Rated</h3>
        <Switch options={['Movies','TV Shows']} handleSwitch={handleSwitch}/>
      </ContentWrapper>
      <Carousel data={data} isLoading={isLoading} endpoint={endpoint}/>
    </div>
  )
}

export default TopRated