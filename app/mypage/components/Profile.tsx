import { useAuthStore } from "@/app/lib/userfetch"


export default function Profile({username,interests}) {

    const { profile } = useAuthStore()

    if(profile.error) throw new Error('유저 닉네임을 불러올 수 없습니다.')

    return(
        <>
            <div>
                <p className="text-4xl font-bold">{username}</p>
                <p className="mt-3">
                    {interests.map((ele:string,index:number)=>(
                        <span key={`${index}-${ele}`}
                        className="mr-1.5 border border-gray-400 bg-white
                        pt-1 pb-1 pr-4 pl-4 rounded-4xl text-lg
                        ">#{ele}</span>
                    ))}
                </p>
            </div>
        </>
    )
}