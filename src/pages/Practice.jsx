import React from 'react'
import { useForm } from 'react-hook-form'

export default function Practice() {

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()


    return (
        <div>
            <div>ARYA</div>
            <form onSubmit={handleSubmit((data) => {
                console.log(data);
            })}>
                <div className='flex flex-col gap-10'>
                    <input className='border-solid border-2 border-red-800' type="text" {...register("password")} name='password' />
                    <input className='border-solid border-2 border-red-800' type="text"
                        {...register("confirmPassword", {
                            validate: (value, formValues) => (
                                value === formValues.password || "PASSWORD NOT MATCHING"
                            )
                        })}

                        // {...register('confirmPassword', {
                        //     validate: (value, formValues) =>
                        //         value === formValues.password || 'password not matching',
                        // })}


                        name='confirmPassword' />
                        {errors.confirmPassword && (<p>{errors.confirmPassword.message}</p>)}
                    <button>SYBMIT</button>
                </div>
            </form>
        </div>
    )
}
