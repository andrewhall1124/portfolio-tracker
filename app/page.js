import { Button } from "@/components/ui/button"

export default async function HomePage(){

  return(
    <>
      <div className="flex flex-col items-start">
        <div>Home page</div>
        <Button>Click Me</Button>
      </div>
    </>
  )
}