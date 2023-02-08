const path = require("path")
require('dotenv').config({ path: __dirname + '/.env' });
const handleErrors = require("../../utilities/controllers/handle_errors")
const joiModel = require("./joi_models");
const axios = require('axios');
const { request } = require("http");

const getRestaurants = async (req, res) => {
    try {
        const validation = joiModel.getRestaurantsReq.validate(req.params)
        if (validation.error) {
            return res.status(403).send({
                success: false,
                message: validation.error,
                data: []
            })
        }
        validatedReq = validation.value;
        const {sw, ne} = validatedReq;
        const url = "https://travel-advisor.p.rapidapi.com/restaurants/list-in-boundary";

        const options = {
            params: {
              bl_latitude: sw.lat ? sw.lat : 0,
              tr_latitude: ne.lat ? ne.lat : 0,
              bl_longitude: sw.lng ? sw.lng : 0,
              tr_longitude: ne.lng ? ne.lng : 0
            },
            headers: {
              'X-RapidAPI-Key': process.env.RAPID_API_KEY,
              'X-RapidAPI-Host': process.env.RAPID_API_HOST
            }
          }
        const response =  await axios.get(url, options);
        return response;
        

    } catch(err) {
        return handleErrors(err, res);
    }
}

module.exports = {
    getRestaurants
}