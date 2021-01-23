/*This is a project for FreeCodeCamp entitled "Random Quote Machine".
This Javascript File uses Stateless React.
This Approach is similar to Landon Schlangen work.
Reference: https://www.youtube.com/watch?v=NyZzRSTZQ2Y*/

function App(){

    const [quotes, setQuotes] = React.useState([]);
    const [randomQuote, setRandomQuote] = React.useState([]);
    const [color, setColor] = React.useState("");

    React.useEffect(() =>{
        async function fetchData(){
            const response = await fetch("https://type.fit/api/quotes")
            const data = await response.json();

            setQuotes(data);
            let randomIndex = Math.floor(Math.random()*data.length);
            setRandomQuote(data[randomIndex])
        }
        fetchData();
    }, [])

    const getNewQuote = () => {
        const colors =[
            "#E68AFF",
            "#5F88E8",
            "#75FFC9",
            "#B7E85F",
            "#FFD269"
        ];
        let randomIndex = Math.floor(Math.random()*quotes.length);
        let randomColorIndex = Math.floor(Math.random()*colors.length);    
        setRandomQuote(quotes[randomIndex]);
        setColor(colors[randomColorIndex])
    }

    return(
    <div style={{background: color, minHeight: "100vh"}}>
        <div className ="container text-center align-middle pt-4" >
            <div className="card" >
                    <div className="card-header">
                    Inspirational Quotes
                    </div>
                    <div className="card-body">
                        {randomQuote ?(
                            /*Fragments*/
                            <>
                            <h5 className="card-title" id="author">- {randomQuote.author || "No Author"}</h5>
                            <p className="card-text" id="text">&quot;{randomQuote.text}&quot;</p>
                            </>
                        ):(
                            <h2>loading</h2>
                        )}

                        <div className="row">
                            <div className="col">
                            <a  id="tweet-quote"
                                href={"https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=" +
                                encodeURIComponent(
                                    '"' +randomQuote.text +'" ' +randomQuote.author
                                ) }
                                
                                target="_blank"className="btn btn-outline-dark m-2">
                                    <i className="fa fa-twitter"></i>
                                </a>
                            
                            <a href={"https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes,freecodecamp&caption="+
                            encodeURIComponent(randomQuote.author)+"&content="+encodeURIComponent(randomQuote.text)+
                            "&canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&share"} className="btn btn-outline-dark m-2">
                                    <i className="fa fa-tumblr"></i>
                                </a>
                            
                                <button  id="new-quote" className="btn btn-outline-dark m-2" onClick={getNewQuote}>New Quote</button>
                            </div>
                        </div>
                    </div>
            </div>
        </div>
    </div>
    );
}

ReactDOM.render(<App/>, document.getElementById("quote-box"))