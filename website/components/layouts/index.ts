import { MetaTags } from "components/partials/DefaultHead"

export type LayoutComponent<P = {}> = React.FC<P & MetaTags>

export { MinimalLayout } from "./MinimalLayout"
export { StandardLayout } from "./StandardLayout"
export { WithFullCoverLayout } from "./WithFullCoverLayout"
export { WithSmallCoverLayout } from "./WithSmallCoverLayout"
