



# JavaScript 온라인 스터디

---

>  2021.05.26 ~ 2021.06.16

### 체크리스트

- [x] #49 TodoList 컴포넌트 작성
- [x] #50 보너스 구현 사항 - 에러 처리
- [x] #57 보너스 구현 사항 - 다중 컴포넌트
- [x] #66 보너스 구현 사항 - isComplete
- [x] #67 보너스 구현 사항 - setState

### 구조
```
├─utils/
│   └── errorCheck.js
├─ index.html
├─ index.js
├─ todoList.js
└─ todoValidator.js
```
- `errorCheck.js` : null, undefined, array type 에 대한 에러 체크 함수를 정의했습니다.
- `index.js` : 기본 data와 컴포넌트 생성 및 render 메서드를 실행하는 메인 js 로직을 담고 있습니다.
- `todoList.js` : `TodoList` 컴포넌트입니다. todo data에 대한 validate, render 메서드, setState 메서드를 정의했습니다.
- `todoValidator.js` :  `errorCheck.js` 를 이용해 todo data에 대한 validate 로직을 정의했습니다.

### 기본 구현 방법
1. `TodoList` 컴포넌트는 각각 `$target`과 `initialState`를 받습니다.
2. 생성 단계에서 가장 먼저 `new` 키워드와 data에 대한 `검증`을 합니다.
3. 그 다음, 각각 `this.$target`과 `this.state`로 저장합니다.
4. `this.setState(nextState)`는 `nextState`를 받아 `검증`한 후, `this.state`에 할당합니다.
5. `this.render()`는 `innerHTML`과 `map`을 활용해 `this.state`에 있는 데이터를 `$target`에 렌더링합니다.