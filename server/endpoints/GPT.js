const express=require("express")
const router=express.Router()


router.post("/", async (req,res)=>{
    console.log("POST founded")
    const formData = req.body;
    console.log(JSON.stringify(formData));
    const gptres = await gtpdata(formData);
    console.log("GPT data send")
    res.json({ response: gptres });
})

router.get("/", async(req, res) => {
    res.send("This is the GPT page request")

})
module.exports=router



const gtpdata = async (formData) => {
    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "assistant",
              content: `You are a highly renowned health and nutrition expert FitnessGPT. Please use the following information about me and create a custom diet, workout, and exercise plan details: ${JSON.stringify(formData)}
                Then, create a detailed workout program for an exercise program, and build a detailed Meal Plan considering my diet and preferences. 
  
    Finally, create a detailed Grocery List for my diet that includes the quantity of each item. 
  
    Note: Avoid any superfluous pre and post descriptive text, and don't break character under any circumstance. 
  
    Bonus: Please finish your response with 10 motivational & inspiring quotes.
  
    This all should be in HTML format and it will be displayed in a <div> element, and do not add any additional CSS.
                `,
            },
          ],
          temperature: 0.7,
        }),
      });
  
      const data = await response.json();
      return data.choices[0]?.message["content"] || data.choices;
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  };
  