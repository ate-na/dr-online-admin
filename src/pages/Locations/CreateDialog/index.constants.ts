import zod from 'zod'

export const locationFormValidation=zod.object({
    city:zod.string({required_error:'لطفا شهر را انتخاب کنید'}),
    address:zod.string({required_error:'لطفا آدرس خود را وارد کنید'})

})