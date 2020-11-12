
const swaggerOptions = {
    swaggerDefinition:{
        info:{
            version:"3.0.0",
            title:"Place Advice API",
            description:"Place API informations",
            contact:{name:"Amazing Öner the develloper"},
            servers:["http://localhost:8080"]
        },
        components:{
            securitySchemes:{
                jwt:{
                    type:"http",
                    scheme:"bearer",
                    in:"header",
                    bearerFormat:"JWT"
                }
            }
        },
        security:[{
            jwt:[]
        }],
        schemes: ["http","https"],
        consumes: ["application/json"],
        produces:["application/json"],
        definitions:{
            Place:{
                type:"object", 
                properties:{
                    id:{"type":"string"},
                    title:{ "type":"string" },
                    content:{ "type":"string" }
                }
            },
            Places:{
                type:"object",
                properties:{
                    places:{
                        type:"object",
                        additionalProperties:{ "$ref":"#/definitions/Place" } 
                    }
                }
            },
            User:{
                type:"object", 
                properties:{
                    id:{"type":"string"},
                    name:{ "type":"string" },
                    email:{"type":"string"},
                    password:{ "type":"string" },
                    token:{"$ref":"#components/securitySchemes/jwt"}
                }
            },
            Users:{
                type:"object",
                properties:{
                    users:{
                        type:"object",
                        additionalProperties:{ "$ref":"#/definitions/User" } 
                    }
                }
            },
        },
          paths:{
            "/api/v1/users":{
                get:{
                    tags:["User"],
                    summary:"Get all User", 
                    responses:{
                        200:{
                            description:"All User are here",
                            schema: {"$ref": "#/definitions/Users"} 
                        }
                    }
                }
            },
            "/api/v1/places":{
                get:{
                    tags:["Place"],
                    summary:"Get all Places", 
                    responses:{
                        200:{
                            description:"All places are here",
                            schema: {"$ref": "#/definitions/Places"} 
                        }
                    }
                }
            },
              
            "/api/v1/places/new":{
                post:{
                    tags:["new place"],
                    summary:"Add a new place",
                    parameters:[{
                        in:"body",
                        name:"body",
                        descriptions:"places that we want to create",
                        schema: {"$ref": "#/definitions/Place"} 
                    }],
                    produces:["application/json"],
                    responses:{
                        200:{
                            description:"Place is created",
                            schemas: {"$ref": "#/definitions/Place"} 
                        },
                        400:{"description":"Place is not created"}
                    },
                }
            },
              "/api/v1/register":{
                post:{
                    tags:["new user"],
                    summary:"Register a new user",
                    parameters:[{
                        in:"body",
                        name:"body",
                        email:"body",
                        descriptions:"User that we want to register",
                        required:"true",
                        schema: {"$ref": "#/definitions/User"} 
                    }],
                    produces:["application/json"],
                    responses:{
                        200:{
                            description:"User is created",
                            schemas: {"$ref": "#/definitions/User"} 
                        },
                        400:{"description":"User is not created"}
                      },
                }
            },
            "/api/v1/login":{
                post:{
                    tags:["login user"],
                    summary:"Login a user",
                    parameters:[{
                        in:"body",
                        email:"body",
                        password:"body",
                        descriptions:"User that we want to login",
                        required:"true",
                        schema: {"$ref": "#/definitions/User"} 
                    }],
                    produces:["application/json"],
                    responses:{
                        200:{
                            description:"User is login",
                            schemas: {"$ref": "#/definitions/User"} 
                        },
                        400:{"description":"User is not created"}
                    },
                }
            },
        }
    },
    apis:["app.js"]
};

module.exports=swaggerOptions