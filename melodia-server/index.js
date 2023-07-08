require("dotenv").config();
const express = require("express");
const cors = require("cors");
const stripe = require('stripe')(process.env.PAYMENT_SECRET_KEY)
const app = express();
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

// middlewears
const corsOptions = {
    origin: '*',
    credentials: true,
    optionSuccessStatus: 200,
}
app.use(cors(corsOptions))

app.use(express.json());




const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.6dgrwby.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        // await client.connect();

        //collections 
        const usersCollection = client.db("melodia").collection("users");
        const classesCollection = client.db("melodia").collection("classes");
        const reviewsCollection = client.db("melodia").collection("review")
        const selectedClassesCollection = client.db("melodia").collection("selectClasses")
        const paymentCollection = client.db("melodia").collection("payments")

        // Get Apis

        // user api
        app.get("/users", async (req, res) => {
            const result = await usersCollection.find().toArray();
            res.send(result);
        });


        // instructor api

        // all instructors
        app.get("/instructors", async (req, res) => {
            const role = "instructor";
            const query = { role };
            const result = await usersCollection.find(query).toArray();
            res.send(result);
        });

        // limit instructor
        app.get("/popularInstructors", async (req, res) => {
            const role = "instructor";
            const query = { role };
            const result = await usersCollection.find(query).limit(6).toArray();
            res.send(result);
        });


        // class api
        // all classes
        app.get("/allClasses", async (req, res) => {
            const status = "approved";
            const result = await classesCollection.find().toArray();
            res.send(result);
        });


        // approved classes
        app.get("/classes", async (req, res) => {
            const status = "approved";
            const query = { status };
            const result = await classesCollection.find(query).toArray();
            res.send(result);
        });


        // my classes
        app.get("/myClasses/:email", async (req, res) => {
            const instructorEmail = req.params.email;
            const query = { instructorEmail };
            const result = await classesCollection.find(query).toArray();
            res.send(result);
        });


        // selected classes get
        app.get("/selectClasses", async (req, res) => {
            const email = req.query.email;
            const query = { email: email };
            const result = await selectedClassesCollection.find(query).toArray();
            res.send(result);
        });

        // reviews 
        app.get("/reviews", async (req, res) => {
            const result = await reviewsCollection.find().toArray();
            res.send(result)
        })

        // payment
        app.get("/payments", async (req, res) => {
            const email = req.query.email;
            const query = { email }
            const result = await paymentCollection.find(query).toArray();
            res.send(result);
        });

        // instructor
        app.get("/users/instructor/:email", async (req, res) => {
            const email = req.params.email;
            const query = { email };
            // console.log(email)
            const user = await usersCollection.findOne(query);
            res.send(user);
        });
        //   admin
        app.get("/users/admin/:email", async (req, res) => {
            const email = req.params.email;
            const query = { email };
            const user = await usersCollection.findOne(query);
            res.send(user);
        });

        // popular Classes
        app.get("/popularClasses", async (req, res) => {
            const limit = 6;
            const sortOptions = { enrolledStudent: -1 }
            const result = await classesCollection.find().sort(sortOptions).limit(limit).toArray();
            console.log(result);
            res.send(result);
        })



        // post apis

        // Users
        app.post("/users", async (req, res) => {
            const user = req.body;
            const query = { email: user.email };
            const existingUser = await usersCollection.findOne(query);
            if (existingUser) {
                return res.send({ message: "User already exists" })
            }
            const result = await usersCollection.insertOne(user);
            res.send(result);
        });

        // classes
        // add class 
        app.post("/addClass", async (req, res) => {
            const classInfo = req.body;
            const result = await classesCollection.insertOne(classInfo);
            res.send(result);
        })

        // select classes
        app.post("/selectClasses", async (req, res) => {
            const classes = req.body;
            console.log(classes);
            const result = await selectedClassesCollection.insertOne(classes);
            res.send(result);
        });

        // payment transition post api
        app.post("/payments", async (req, res) => {
            const classes = req.body;
            const result = await paymentCollection.insertOne(classes);
            res.send(result);
        });

        // create payment intent
        app.post("/create-payment-intent", async (req, res) => {
            const { price } = req.body;
            const amount = +price * 100;
            const paymentIntent = await stripe.paymentIntents.create({
                amount: amount,
                currency: 'usd',
                payment_method_types: ['card']
            });
            res.send({
                clientSecret: paymentIntent.client_secret
            });
        });




        // patch apis

        // admin api
        app.patch("/users/admin/:id", async (req, res) => {
            const id = req.params.id;
            const filter = { _id: new ObjectId(id) };
            const updateInfo = {
                $set: {
                    role: "admin",
                },
            };
            const result = await usersCollection.updateOne(filter, updateInfo);
            res.send(result);
        });


        app.patch("/users/instructor/:id", async (req, res) => {
            const id = req.params.id;
            const filter = { _id: new ObjectId(id) };
            const updateInfo = {
                $set: {
                    role: "instructor",
                },
            };
            const result = await usersCollection.updateOne(filter, updateInfo);
            res.send(result);
        });

        // update class status
        app.patch("/class/approved/:id", async (req, res) => {
            const id = req.params.id;
            const filter = { _id: new ObjectId(id) };
            const updateInfo = {
                $set: {
                    status: "approved",
                },
            };
            const result = await classesCollection.updateOne(filter, updateInfo);
            res.send(result);
        });

        // class denied
        app.patch("/class/denied/:id", async (req, res) => {
            const id = req.params.id;
            const filter = { _id: new ObjectId(id) };
            const updateInfo = {
                $set: {
                    status: "denied",
                },
            };
            const result = await classesCollection.updateOne(filter, updateInfo);
            res.send(result);
        });

        // enrolled class update api
        app.patch("/class/:id", async (req, res) => {
            const classId = req.params.id;
            // console.log(id);
            const filter = { _id: new ObjectId(classId) };
            const enrolledStudent = req.body.enrolledStudent;
            const availableSeats = req.body.availableSeats;
            console.log(enrolledStudent, availableSeats);
            const updateInfo = {
                $set: {
                    enrolledStudent,
                    availableSeats
                },
            };
            const result = await classesCollection.updateOne(filter, updateInfo);
            res.send(result);
        });

        
        // delete apis 

        // delete selected class
        app.delete('/selectClasses/:id', async (req, res) => {
            const id = req.params.id;
            console.log(id);
            const query = { _id: new ObjectId(id) };
            const result = await selectedClassesCollection.deleteOne(query);
            console.log(query);
            res.send(result);

        })

        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);


app.get("/", (req, res) => {
    res.send("Melodia is running");
});

app.listen(port, () => {
    console.log(`Melodia is running on${port}`);
});