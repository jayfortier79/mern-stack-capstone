import FetchData from "../../utilities/fetch"



function NewOrderPage() {
const {records, loading, error} = FetchData("https://jsonplaceholder.typicode.com/todos/1");
  
if (loading) return <h3>LOADING...</h3>;
if (error) console.log(error); 
    return (
      <div>
      <h1>Newness</h1>
      <h2>{records}</h2>
      
  
      
      
      </div>

      

    )
  }
  
  export default NewOrderPage