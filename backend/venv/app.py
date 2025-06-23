# venv\Scripts\activate

from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
from bson import ObjectId 
from datetime import datetime, timezone

app = Flask(__name__)
# CORS(app, resources={r"/api/*": {"origins": "*"}}, methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"])
CORS(app)  # Enable CORS globally


#=========================================Login==============================================
client = MongoClient("mongodb+srv://maybe_atul:Test123456@cluster0.f8b1wr8.mongodb.net/")
db = client['grocery_store']
users = db['users']
admins = db['admin']  

print("db_connected")

@app.route('/', methods=['POST'])
def login():
    data = request.json
    email = data.get('email')
    password = data.get('password')

    # Check in users collection
    user = users.find_one({'cust_email': email, 'cust_pwd': password})
    if user:
        return jsonify({
            "message": "Login successful",
            "status": "success",
            "username": user.get("cust_name", "User"),
            "customer_num": user.get("cust_num", "User_num"),
            "role": "user"  # role added dynamically
        }), 200

    # Check in admin collection
    admin = admins.find_one({'email': email, 'pwd': password})
    if admin:
        return jsonify({
            "message": "Login successful",
            "status": "success",
            "username": admin.get("name", "Admin"),
            "role": "admin"  # role added dynamically
        }), 200

    return jsonify({"message": "Invalid credentials", "status": "fail"}), 401


#=======================================Signup================================================

@app.route('/signup', methods=['POST']) 
def signup():
    data = request.get_json()

    # Check if all required fields are present
    if not all([data.get("name"), data.get("phone"), data.get("email"), data.get("password"), data.get("address")]):
        return jsonify({"status": "fail", "message": "Missing required fields"}), 400

    # Check if user already exists
    existing_user = users.find_one({"cust_email": data["email"]})
    if existing_user:
        return jsonify({"status": "fail", "message": "Email already exists"}), 409

    # Get last inserted customer number and increment it
    last_user = users.find_one(sort=[("cust_num", -1)])  # Get the highest cust_num
    new_cust_num = last_user["cust_num"] + 1 if last_user and "cust_num" in last_user else 1

    # Insert new user into users collection
    new_user = {
        "cust_num": new_cust_num,  # Assign new customer number
        "cust_name": data["name"],
        "cust_phn": data["phone"],
        "cust_add": data["address"],
        "cust_email": data["email"],
        "cust_pwd": data["password"]  # Consider hashing passwords for security
    }

    users.insert_one(new_user)

    return jsonify({"status": "success", "message": "User registered successfully", "cust_num": new_cust_num}), 201


#===========================================Categories in sidebar============================================
    
@app.route("/api/categories", methods=["GET"])
def get_categories():
    categories_collection = db['categories']  # Define the correct collection
    categories = categories_collection.find({}, {"_id": 0, "category": 1})
    categories_list = [category["category"] for category in categories]
    return jsonify(categories_list)


#==========================================Items=============================================

@app.route("/api/items", methods=["GET"])
def get_items():
    category = request.args.get("category")
    query = {"category": category} if category else {}
    items = list(db.items.find(query, {"_id": 0}))
    return jsonify(items)


#====================================Cart===================================================


@app.route('/api/cart', methods=['POST'])
def add_to_cart():
    # Extract data from the request
    data = request.get_json()
    name = data.get('name')
    price = data.get('price')
    image_link = data.get('image_link')
    qty = data.get('qty')

    # Save to DB or session (this part is omitted)
    print("Cart item received:", {"name": name, "price": price, "image_link": image_link, "qty": qty})

    # Respond back
    return jsonify({"status": "success", "message": "Item added to cart"})


#===========================CheckOut/Payemnt============================================================
# @app.route('/api/checkout', methods=['POST'])
# def checkout():
#     data = request.get_json()

#     if not data or not data.get("payment_id"):
#         return jsonify({"status": "fail", "message": "Payment verification failed"}), 400

#     try:
#         cust_num = int(data.get("customer_num"))
#     except (TypeError, ValueError):
#         return jsonify({"status": "fail", "message": "Invalid or missing customer number"}), 400

#     orders = db['orders']
#     latest_order = orders.find_one(sort=[("order_id", -1)])
#     new_order_id = latest_order["order_id"] + 1 if latest_order and "order_id" in latest_order else 1

#     order = {
#         "order_id": new_order_id,
#         "cust_num": cust_num,
#         "name": data.get("name"),
#         "phone": data.get("phone"),
#         "address": data.get("address"),
#         "items": data.get("items"),
#         "total": data.get("total"),
#         "date": data.get("date"),
#         "payment_id": data.get("payment_id"),
#         "payment_mode": data.get("payment_mode"),
#         "payment_status": data.get("payment_status"),
#     }

#     orders.insert_one(order)

#     # -- Add to payments collection --
#     payments = db['payments']
#     latest_payment = payments.find_one(sort=[("payment_id", -1)])
#     new_payment_id = latest_payment["payment_id"] + 1 if latest_payment and "payment_id" in latest_payment else 1

#     payment_data = {
#         "payment_id": new_payment_id,
#         "cust_num": cust_num,
#         "order_id": new_order_id,
#         "payment_status": data.get("payment_status"),
#         "payment_mode": data.get("payment_mode"),
#         "total_amount": data.get("total"),
#         "razorpay_payment_id": data.get("payment_id"),
#         "payment_date": data.get("date")
#     }

#     payments.insert_one(payment_data)

#     response = jsonify({"status": "success", "message": "Order and payment saved", "order_id": new_order_id})
#     response.headers.add("Access-Control-Allow-Origin", "*")
#     return response, 200

@app.route('/api/checkout', methods=['POST'])
def checkout():
    data = request.get_json()

    if not data or not data.get("payment_id"):
        return jsonify({"status": "fail", "message": "Payment verification failed"}), 400

    try:
        cust_num = int(data.get("customer_num"))
    except (TypeError, ValueError):
        return jsonify({"status": "fail", "message": "Invalid or missing customer number"}), 400

    orders = db['orders']
    latest_order = orders.find_one(sort=[("order_id", -1)])
    new_order_id = latest_order["order_id"] + 1 if latest_order and "order_id" in latest_order else 1

    order = {
        "order_id": new_order_id,
        "cust_num": cust_num,
        "name": data.get("name"),
        "phone": data.get("phone"),
        "address": data.get("address"),
        "items": data.get("items"),
        "total": data.get("total"),
        "date": data.get("date"),
        "payment_id": data.get("payment_id"),
        "payment_mode": data.get("payment_mode"),
        "payment_status": data.get("payment_status"),
    }

    orders.insert_one(order)

    # -- Update Stock in items collection --
    items_collection = db["items"]

    for item in data.get("items", []):
        item_name = item["name"]
        qty_ordered = int(item["stock_qty"])

        result = items_collection.update_one(
            {"item_name": item_name},
            {"$inc": {"stock_qty": -qty_ordered}}  # ✅ Subtract ordered quantity
        )

        if result.matched_count == 0:
            return jsonify({"status": "fail", "message": f"Item '{item_name}' not found"}), 404

    # -- Add to payments collection --
    payments = db['payments']
    latest_payment = payments.find_one(sort=[("payment_id", -1)])
    new_payment_id = latest_payment["payment_id"] + 1 if latest_payment and "payment_id" in latest_payment else 1

    payment_data = {
        "payment_id": new_payment_id,
        "cust_num": cust_num,
        "order_id": new_order_id,
        "payment_status": data.get("payment_status"),
        "payment_mode": data.get("payment_mode"),
        "total_amount": data.get("total"),
        "razorpay_payment_id": data.get("payment_id"),
        "payment_date": data.get("date")
    }

    payments.insert_one(payment_data)

    response = jsonify({"status": "success", "message": "Order and payment saved. Stock updated.", "order_id": new_order_id})
    response.headers.add("Access-Control-Allow-Origin", "*")
    return response, 200
#==========================================Orders=========================================

@app.route('/orders', methods=['GET'])
def get_orders():
    orders_collection = db['orders']
    orders = list(orders_collection.find({}, {"_id": 0}))  # Exclude _id for readability
    response = jsonify(orders)
    response.headers.add("Access-Control-Allow-Origin", "*")  # Explicitly allow frontend requests
    return response


#==========================================Admin Dashboard Functions=========================================

#User management from admin dashboard

@app.route('/api/users', methods=['GET'])
def get_users():
    users_data = list(users.find({}, {"_id": 1,"cust_num": 1, "cust_name": 1, "cust_phn": 1, "cust_email": 1, "cust_add": 1}))
    for user in users_data:
        user["_id"] = str(user["_id"])  # Convert ObjectId to string for frontend compatibility
    return jsonify(users_data)

#-------------------------------Managing Items------------------------------------------------
categories_collection = db["categories"]

#dropdown menu

@app.route('/api/dashboard_categories', methods=['GET'])
def get_dashboard_categories():
    categories = list(categories_collection.find({}, {'_id': 0, 'category': 1}))  # Fetch only category field
    response = jsonify(categories)
    response.headers.add("Access-Control-Allow-Origin", "*")  # Allow frontend requests
    return response

# items from dropdown
@app.route('/api/items', methods=['GET'])
def get_items_by_category():
    category = request.args.get('category', '')
    
    if not category:
        return jsonify([]), 200  # Return empty list if no category is selected

    items = list(db.items.find({"category": category}, {'_id': 0, 'name': 1, 'price': 1, 'stock_qty': 1}))

    response = jsonify(items)
    response.headers.add("Access-Control-Allow-Origin", "*")  # Allow frontend requests
    return response


#deleting
@app.route('/api/items/<int:item_num>', methods=['DELETE'])
def delete_item(item_num):
    result = db.items.delete_one({"item_num": item_num})

    if result.deleted_count == 0:
        return jsonify({"status": "fail", "message": "Item not found"}), 404

    return jsonify({"status": "success", "message": "Item deleted successfully"}), 200

#updating items
@app.route('/api/items/<int:item_num>', methods=['PUT'])
def update_item(item_num):
    updated_data = request.json  # Get updated fields from frontend

    # Ensure required fields are present
    if not all(field in updated_data for field in ["name", "price", "status", "stock_qty"]):
        return jsonify({"status": "fail", "message": "Missing required fields"}), 400

    result = db.items.update_one({"item_num": item_num}, {"$set": updated_data})

    if result.matched_count == 0:
        return jsonify({"status": "fail", "message": "Item not found"}), 404

    return jsonify({"status": "success", "message": "Item updated successfully"}), 200
#------------------------------Adding New User-----------------------------------------------
@app.route('/api/users', methods=['POST'])
def add_user():
    data = request.get_json()

    if not all([data.get("name"), data.get("phone"), data.get("email"), data.get("password"), data.get("address")]):
        return jsonify({"status": "fail", "message": "Missing required fields"}), 400

    # Find the highest cust_num and increment it
    last_user = users.find_one(sort=[("cust_num", -1)])  # Get the latest customer number
    new_cust_num = last_user["cust_num"] + 1 if last_user and "cust_num" in last_user else 1

    # Insert new user into users collection
    new_user = {
        "cust_num": new_cust_num,  # Assign new customer number
        "cust_name": data["name"],
        "cust_phn": data["phone"],
        "cust_email": data["email"],
        "cust_pwd": data["password"],  # Consider hashing for security
        "cust_add": data["address"]
    }

    users.insert_one(new_user)

    return jsonify({"status": "success", "message": "User added", "cust_num": new_cust_num}), 201

#---------------------------------Adding items to table-----------------------------------------------------

@app.route('/api/items', methods=['POST'])
def add_item():
    new_item = request.json

    # Define required fields
    required_fields = ["item_num", "category", "item_name", "price", "status", "stock_qty", "image_link"]

    # Check for missing fields
    missing_fields = [field for field in required_fields if field not in new_item or not new_item[field]]
    if missing_fields:
        return jsonify({"status": "fail", "message": f"Missing fields: {', '.join(missing_fields)}"}), 400

    # Insert item into database
    try:
        db.items.insert_one(new_item)
        return jsonify({"status": "success", "message": "Item added successfully"}), 201
    except Exception as e:
        return jsonify({"status": "fail", "message": str(e)}), 500

#populating item number
@app.route('/api/items/next_available_item_num', methods=['GET'])
def get_next_available_item_num():  # Updated function name
    last_item = db.items.find_one({}, sort=[("item_num", -1)])
    next_item_num = last_item["item_num"] + 1 if last_item else 1
    return jsonify({"next_item_num": next_item_num})

@app.route('/api/categories_list', methods=['GET'])
def fetch_categories_list():  # Updated function name
    categories = list(db.categories.find({}, {'_id': 0, 'category': 1}))
    return jsonify(categories)



#----------------------------Updating User record-------------------------------------------------
@app.route('/api/users/<user_id>', methods=['PUT'])  # Use PUT here if following REST conventions
def update_user(user_id):
    print(f"Received user_id: {user_id}")  # Debug log

    try:
        # Validate ObjectId
        if not ObjectId.is_valid(user_id):
            return jsonify({"status": "fail", "message": "Invalid user ID"}), 400

        data = request.get_json()
        print(f"Received data: {data}")  # Debug log

        update_fields = {
            "cust_name": data.get("name", ""),
            "cust_phn": data.get("phone", ""),
            "cust_email": data.get("email", ""),
            "cust_add": data.get("address", "")
        }

        # Optional password field
        if data.get("password"):
            update_fields["cust_pwd"] = data["password"]

        update_query = {"$set": update_fields}

        result = users.update_one({"_id": ObjectId(user_id)}, update_query)

        print(f"Matched count: {result.matched_count}")
        print(f"Modified count: {result.modified_count}")

        if result.matched_count == 0:
            return jsonify({"status": "fail", "message": "User not found"}), 404

        return jsonify({
            "status": "success",
            "message": "User updated (or data unchanged)",
            "matched": result.matched_count,
            "modified": result.modified_count
        }), 200

    except Exception as e:
        print(f"Error updating user: {e}")
        return jsonify({"status": "fail", "message": "Internal Server Error"}), 500
#----------------------------Deleting user record-------------------------------------------------
@app.route('/api/users/<user_id>', methods=['DELETE'])
def delete_user(user_id):
    users.delete_one({"_id": ObjectId(user_id)})
    return jsonify({"status": "success", "message": "User deleted"}), 200

#--------------------------------Managing User Queries------------------------------------------------

@app.route('/contact', methods=['POST'])
def manage_query():
    data = request.get_json()
    if not all([data.get("name"), data.get("email"), data.get("message")]):
        return jsonify({"status": "fail", "message": "Missing required fields"}), 400

    last_query = queries_collection.find_one(sort=[("contact_id", -1)])
    new_contact_id = last_query["contact_id"] + 1 if last_query and "contact_id" in last_query else 1

    new_query = {
        "contact_id": new_contact_id,
        "name": data["name"],
        "email": data["email"],
        "message": data["message"],
        "date": data.get("date", ""),
        "replied": False
    }

    queries_collection.insert_one(new_query)
    return jsonify({
        "status": "success",
        "message": "Query submitted successfully",
        "contact_id": new_contact_id
    }), 201

# Get all queries
@app.route('/queries', methods=['GET'])
def get_all_queries():
    queries = list(queries_collection.find({}, {"_id": 0}))
    return jsonify(queries), 200

#  Delete a query
@app.route('/queries/<int:contact_id>', methods=['DELETE'])
def delete_query(contact_id):
    result = queries_collection.delete_one({"contact_id": contact_id})
    if result.deleted_count == 0:
        return jsonify({"status": "fail", "message": "Query not found"}), 404
    return jsonify({"status": "success", "message": "Query deleted"}), 200

#  Mark query as replied
@app.route('/queries/<int:contact_id>', methods=['PUT'])
def mark_query_replied(contact_id):
    result = queries_collection.update_one(
        {"contact_id": contact_id},
        {"$set": {"replied": True}}
    )
    if result.matched_count == 0:
        return jsonify({"status": "fail", "message": "Query not found"}), 404
    return jsonify({"status": "success", "message": "Query marked as replied"}), 200

#-------------------------Payments-------------------------------------------

@app.route('/api/payments', methods=['GET'])
def get_payments():
    payments = list(db['payments'].find({}, {'_id': 0}))  # Exclude Mongo _id
    return jsonify(payments), 200



#============================Queries=====================================================
queries_collection = db["queries"]
@app.route('/contact', methods=['POST'])
def submit_query():
    data = request.get_json()

    if not all([data.get("name"), data.get("email"), data.get("message")]):
        return jsonify({"status": "fail", "message": "Missing required fields"}), 400

    last_query = queries_collection.find_one(sort=[("contact_id", -1)])
    new_contact_id = last_query["contact_id"] + 1 if last_query and "contact_id" in last_query else 1

    new_query = {
        "contact_id": new_contact_id,
        "name": data["name"],
        "email": data["email"],
        "message": data["message"],
        "date": data.get("date", "")
    }
    print(new_query) 

    queries_collection.insert_one(new_query)

    return jsonify({
        "status": "success",
        "message": "Query submitted successfully",
        "contact_id": new_contact_id
    }), 201

#=================================Viewing User Order=============================================

@app.route('/api/user-orders', methods=['GET'])
def get_user_orders():
    cust_num = request.args.get("cust_num")  # ✅ Get cust_num from query params

    if not cust_num:
        return jsonify({"status": "fail", "message": "Customer ID is required"}), 400

    try:
        cust_num = int(cust_num)  # ✅ Ensure cust_num is an integer
    except ValueError:
        return jsonify({"status": "fail", "message": "Invalid customer ID format"}), 400

    orders = list(db.orders.find({"cust_num": cust_num}, {'_id': 0}))  # ✅ Query matching orders

    if not orders:
        return jsonify({"status": "fail", "message": "No orders found"}), 404

    return jsonify({"status": "success", "orders": orders}), 200


if __name__ == '__main__':
    app.run(debug=True)
