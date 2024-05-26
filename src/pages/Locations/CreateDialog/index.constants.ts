import zod from 'zod'

export const locationFormValidation=zod.object({
    city:zod.number({required_error:'لطفا شهر را انتخاب کنید'}),
    locationform:zod.string({required_error:'لطفا آدرس خود را وارد کنید'})

})