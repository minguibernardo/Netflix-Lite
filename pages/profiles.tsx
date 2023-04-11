/* eslint-disable @next/next/no-img-element */


import { NextPageContext, InferGetServerSidePropsType } from "next";
import { getSession } from "next-auth/react";
import useCurrentUser from "@/hooks/useCurrentUser";
import { useRouter } from "next/router";

export async function getServerSideProps(context: NextPageContext) {
const session = await getSession(context);

if (!session) {
    return {
    redirect: {
        destination: '/auth',
        permanent: false,
    }
    }
}

return {
    props: {}
}
}
const profiles = (props: InferGetServerSidePropsType<typeof getServerSideProps>)=>{

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const {data: user } = useCurrentUser();
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const router = useRouter();

    return(
        <div className="flex items-center justify-center h-full">
            <div className="flex flex-col">
                <p className="text-3xl text-center text-white md:text-6xl">Who is watching?</p>
                <div className="flex items-center justify-center gap-8 mt-10">
                    <div onClick={( ) =>  {router.push('/')}}>
                        <div className="flex-row group w-44 max-auto">
                            <div
                            className="flex items-center justify-center overflow-hidden border-2 border-transparent rounded-md  w-44 h-44 group-hover:cursor-pointer group-hover:border-white">
                                <img src="/images/default-blue.png" alt="Profile" />
                            </div>
                            <div className="mt-4 text-2xl text-center text-gray-400 group-hover:text-white">
                                {user?.name}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default profiles;