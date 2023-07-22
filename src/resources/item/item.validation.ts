import Joi from 'joi';
 

const create = Joi.object({
    title:Joi.string().required(),
    description:Joi.string().required(),
    price:Joi.string().required(),
    rating:Joi.string().required()
})



export default {create};