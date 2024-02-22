"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const main_container = document.querySelector(".main_container");
const SearchInput = document.querySelector("#Search_Input");
const FormSubmit = document.querySelector("#form");
function FetchData(url) {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield fetch(url);
        if (!res.ok) {
            throw new Error(`Data cant be fetched${res.status}`);
        }
        const data = yield res.json();
        return data;
    });
}
const ShowResultUI = (singeuser) => {
    const { login, url, avatar_url, id } = singeuser;
    main_container.insertAdjacentHTML("beforeend", `
        <div class="center">
        <div class="article-card">
          <div class="content">
            <p class="date">github</p>
            <p class="title">${login}</p>
          </div>
          <img src=${avatar_url} />
        </div>
      </div>
        `);
};
function mycoustomfetcher(url) {
    FetchData(url)
        .then(data => {
        console.log(data);
        for (const singeuser of data) {
            ShowResultUI(singeuser);
            // console.log("lll ", singeuser.login);
        }
    })
        .catch(error => {
        console.error(error);
    });
}
mycoustomfetcher("https://api.github.com/users");
// Search Functionality
const handleSubmit = (e) => __awaiter(void 0, void 0, void 0, function* () {
    e.preventDefault();
    const searchValue = SearchInput.value.toLowerCase();
    try {
        const url = `https://api.github.com/users`;
        const allData = yield FetchData(url);
        const matchinguser = allData.filter((user) => {
            return user.login.toLocaleLowerCase().includes(searchValue);
        });
        main_container.innerHTML = "";
        if (matchinguser.length === 0) {
            return false;
        }
        else {
            for (const singleuser of matchinguser) {
                ShowResultUI(singleuser);
            }
        }
    }
    catch (error) {
        console.log("Search Issue", error);
    }
});
FormSubmit.addEventListener("submit", handleSubmit);
