import './news.css'

export default function RenderNews(props) {
    const {urlToImage, title, description} = props
    
    return(
        <div className='card'>
            <div className='img-container'>
                <img src={urlToImage ? urlToImage : 'https://ichef.bbci.co.uk/live-experience/cps/624/cpsprodpb/11787/production/_124395517_bbcbreakingnewsgraphic.jpg'} alt='img'/>
            </div>
            <h4>{title.slice(0,30)+'...'}</h4>
            <p>{description.slice(0,70)+'...'}</p>
        </div>
    )
}