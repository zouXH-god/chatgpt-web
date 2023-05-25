import json
import time

import openai
import requests
from flask import Flask, request
from flask.json import jsonify

app = Flask(__name__)


# 发送chatgpt信息请求
@app.route("/", methods=["GET", "POST"])
def index():
    with open("./templates/wxid/chatGPT.html", "r", encoding="utf-8") as fp:
        html = fp.read()
    return html


# 发送chatgpt信息请求
@app.route("/sendChatGPT", methods=["GET", "POST"])
def sendChat():
    msg = compress_content(request.form.get("messages"))
    key = request.form.get("key")

    if not requests_in_web(request.host):
        return "本站点为公益站点，请勿将本站接口外用，谢谢"

    if not key:
        with open("static/settings/key.txt", "r") as fp:
            key = fp.read()
    openai.api_key = key
    if not openai.api_key.startswith("sk-"):
        return "未设置共享key或共享key错误，请填写私有key使用或更换共享key"
    try:
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=msg
        )
        res = response["choices"][0]["message"]["content"]
    except:
        res = "返回结果err，请稍后再试"
    return res.strip()


# 查询openai余额
@app.route("/open_fill")
def get_open_fill():
    # 设置 API 密钥和授权令牌
    api_key = request.args.get("key")
    return jsonify(count_search(api_key))


# 修改默认key
@app.route("/setKey")
def setKey():
    api_key = request.args.get("key")
    if not api_key:
        return "请填入参数key"
    elif not api_key.startswith("sk-"):
        return "key格式错误，请检查后再次提交"
    with open("static/settings/key.txt", "w") as fp:
        fp.write(api_key)
    return f"key已更新，当前key:{api_key}"


# 查询key余额
def count_search(key):
    count_info_url = "https://api.openai.com/v1/dashboard/billing/subscription"
    start_date = time.strftime("%Y-%m-%d", time.localtime(time.time() - 7776000))
    today = time.strftime("%Y-%m-%d", time.localtime(time.time() + 86400))
    user_info_url = f"https://api.openai.com/v1/dashboard/billing/usage?start_date={start_date}&end_date={today}"

    headers = {
        "authorization": f"Bearer {key}",
        "content-type": "application/json",
        "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36"
    }
    count_info = requests.get(count_info_url, headers=headers).json()
    all_usd = count_info.get("system_hard_limit_usd")
    if not all_usd:
        return {"code": 0}
    use_info = requests.get(user_info_url, headers=headers).json()
    use_usd = use_info.get("total_usage") / 100
    fill_usd = all_usd - use_usd
    return {
        "code": 1,
        "all_usd": all_usd,
        "use_usd": use_usd,
        "fill_usd": fill_usd
    }


# 检查上下文是否超出，进行裁剪
def compress_content(content_val):
    val_dict = json.loads(content_val)
    if len(str(content_val)) > 2000:
        for d in val_dict[:-2]:
            if len(d["content"]) > 300:
                d["content"] = d["content"][:100] + "..."
    re_list = []
    if len(val_dict) > 10:
        for l in val_dict:
            if l["role"] == "system":
                re_list.append(l)
                break
        val_dict = re_list + val_dict[-10:]

    return val_dict


# 判断请求是否从网站发出
def requests_in_web(host):
    if host == "chat.s1f.top":
        return True
    else:
        return False


if __name__ == '__main__':
    app.run("0.0.0.0", 80)
