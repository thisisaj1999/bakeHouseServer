import Joi from 'joi';
 

const create = Joi.object({
    title:Joi.string().required(),
    description:Joi.string().required(),
    price:Joi.number().required(),
    rating:Joi.number().required()
})



export default {create};