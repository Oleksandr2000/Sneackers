import React from "react"
import ContentLoader from "react-content-loader"

const Skeleton = (props) => (
  <ContentLoader 
    speed={2}
    width={225}
    height={265}
    viewBox="0 0 155 265"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="1" y="15" rx="10" ry="10" width="155" height="155" /> 
    <rect x="0" y="177" rx="5" ry="5" width="155" height="15" /> 
    <rect x="0" y="197" rx="5" ry="5" width="100" height="15" /> 
    <rect x="1" y="234" rx="5" ry="5" width="80" height="24" /> 
    <rect x="124" y="230" rx="10" ry="10" width="32" height="32" />
  </ContentLoader>
)

export default Skeleton;