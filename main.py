from fastapi import FastAPI

app = FastAPI()

# New
Login = [
    {
        "Client": "1.2.1",
        "ID": 1,
        "LoginDate": "02.08.2022",
        "LogoutDate": "02.08.2022",
        "POS": "01",
        "hr": 8,
        "name": "อรุณ"
    },
    {
        "Client": "1.2.1",
        "ID": 2,
        "LoginDate": "02.08.2022",
        "LogoutDate": "02.08.2022",
        "POS": "01",
        "hr": 8,
        "name": "เบิกฟ้า"
    	}
	]


@app.get("/")
async def root():
    return Login
@app.get("/Login/{ID}")
async def get_ID(ID: int):
    return Login[ID-1]

