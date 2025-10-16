
import { TypeAnimation } from "react-type-animation"

const TypingAnim = () => {
  return (
    <div>
  <TypeAnimation
    preRenderFirstString={true}
    sequence={[
      500,
      "Chat with you own AI", // initially rendered starting point
      1000,
      "Built with OpenAI",
      2000,
      "Your own customized Chat-GPT",
      1500,
      
    ]}
    speed={50}
    style={{ 
        fontSize: "60px", 
        color: "white", 
        display: "inline-block", 
        textShadow: "1px 1px 20px #000" 
    }}
    repeat={Infinity}
  />
</div>
  )
}

export default TypingAnim
