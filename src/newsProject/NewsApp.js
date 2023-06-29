import { useState, useEffect } from "react"
import RenderNews from "./RenderNews"
import Pagination from "./Pagination"
import Header from "./Header"
import './news.css'
import News from './news.json'

export default function NewsApp() {
    const [search, setSearch] = useState("")
    const [news, setNews] = useState()
    const [input, setInput] = useState()
    const [pageNo, setPageNo] = useState(1)
    const [api, setApi] = useState(false)
    const [submit, setSubmit] = useState(false)
    

    useEffect(()=>{
        const fetchNews = async() => {
            const date = new Date()
            const searchdate = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
            const data = await fetch(`
            https://newsapi.org/v2/everything?q=${search}&from=${searchdate}&sortBy=publishedAt&apiKey=ffaae82da15b4bbc89190dbb311a970b&pageSize=9&page=${pageNo}`)
            const jsonData = await data.json()
            if(jsonData.articles){
                setApi(true)
                setNews(jsonData.articles)
            }
            else
            setNews(News.articles.filter((ele,index)=>index>=pageNo && index<pageNo+9))
        }
        fetchNews()
    },[search,pageNo])

    const handleSubmit = (e) => {
        e.preventDefault()
        setPageNo(1)
        setSearch(input)
        setSubmit(true)
    }

    return(
        <div className="news-page">
            <Header/>
            <form onSubmit={handleSubmit} className="form">
                <input type='text' value={input} placeholder="search news" onChange={(e)=>{setInput(e.target.value)}}/>
                <button type='submit'>Search news</button>
            </form>
            {submit ?
            <div className="render">
                {!api&&<h2>Unable to render news from api due to some issues, displaying sample news</h2>}
                <div className="container">
                    {news && news.map((ele)=>{
                        return <RenderNews urlToImage={ele.urlToImage} title={ele.title} description={ele.description} />
                    })}
                </div>
                <p>pageNo: {pageNo}</p>
                <Pagination pageNo={pageNo} setPageNo={setPageNo} total={news && news.length}/>
            </div>:<h1 style={{color:'#330057'}}>search news</h1>
            }
        </div>
    )
}