import { useState, useEffect } from "react"
import RenderNews from "./RenderNews"
import Pagination from "./Pagination"
import Header from "./Header"
import './news.css'

export default function NewsApp() {
    const [search, setSearch] = useState("")
    const [news, setNews] = useState()
    const [input, setInput] = useState()
    const [pageNo, setPageNo] = useState(1)
    

    useEffect( ()=>{
        const fetchNews = async() => {
            const data = await fetch(`
            https://newsapi.org/v2/everything?q=${search}&from=2023-06-10&sortBy=publishedAt&apiKey=8d569128218f497a9d7bb8cbf8f33177&pageSize=9&page=${pageNo}`)
            const jsonData = await data.json()
            setNews(jsonData.articles)
        }
        fetchNews()
    },[search,pageNo])

    const handleSubmit = (e) => {
        e.preventDefault()
        setSearch(input)
    }

    return(
        <div className="news-page">
            <Header/>
            <form onSubmit={handleSubmit} className="form">
                <input type='text' value={input} placeholder="search news" onChange={(e)=>{setInput(e.target.value)}}/>
                <button type='submit'>Search news</button>
            </form>
            {news ?
            <div className="render"> 
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