import { Article, Embed, Image, Quote } from "./slices"

const RenderSlices = ({ allSlices }) => {
    return (
        <>
            {allSlices.map((slice, index) => {
                switch (slice.slice_type) {
                case ('article'):
                    return <div className="col-md-8 mx-auto blog__post-article" key={'slice-'+index} ><Article slice={slice}/></div>
                case ('image'):
                    return <div className="col-md-8 mx-auto" key={'slice-'+index} ><Image slice={slice}/></div>
                case ('quote'):
                    return <div className="col-md-8 mx-auto" key={'slice-'+index} ><Quote slice={slice}/></div>
                case ('embed'):
                    return <div className="col-md-12" key={'slice-'+index} ><Embed slice={slice}/></div>
                default:
                    return null;
                }
            })}
        </>
    )
};

  export default RenderSlices;