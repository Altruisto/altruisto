import { RichText } from "prismic-reactjs"

export default ({ slice }) => {
    console.log(slice.primary.left_column);
    
    return (
        <div className="row">
            <div className='col-md-6'><RichText render={slice.primary.left_column} /></div>
            <div className='col-md-6'><RichText render={slice.primary.right_column} /></div>
        </div>
    )
}