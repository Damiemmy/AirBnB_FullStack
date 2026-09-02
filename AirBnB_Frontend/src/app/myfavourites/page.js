import PropertyList from "@/Components/PropertyList/PropertyList"
import { getUserId } from "../lib/action"

const page = async() => {
    const userId=await getUserId()
    if(!userId){
        return(
            <main className="max-w-[1500px] max-auto px-6 py-12">
                <p>You need to be Authenticated...</p>
            </main>
        )
    }

  return (
    <main className="max-w-[1500px] max-auto px-6 pb-12">
      <div className='my-6 text-2xl'>
        My favourites
      </div>
      <div className='mt-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6'>
        <PropertyList favorites={true} />
      </div>
    </main>
  )
}

export default page
