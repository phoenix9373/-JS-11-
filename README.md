



# JavaScript 온라인 스터디

---

>  2021.05.26 ~ 2021.06.16

## 1주차

### 구현사항

1. TodoList 컴포넌트 생성
2. 에러 핸들링(null, undefined, data type, new keyword 등)
3. 다중 컴포넌트 생성
4. setState, render 함수 등

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



## 2주차

### 세션

- 컴포넌트란?
  - 마크업, 스크립트 등 UI를 구성하는 스타일, 태그, 동작 등의 코드를 하나로 묶어놓는 단위.
  - 장점 : 각각 컴포넌트 단위에서 발생하는 에러를 해당 단위 안에서만 디버깅하면 되므로 상당히 편함. 또한, 데이터 흐름 파악도 훨씬 쉬워짐. 재사용 가능, 테스트 코드 작성 용이.
  - 컴포넌트라는 개념도 React에서 생긴 것이 아니라, 이전에 JQuery로도 컴포넌트 코드 작성이 가능했다.

### 체크리스트

- [x] #75 TodoApp 업그레이드하기
- [x] #76 보너스 구현사항 - input 컴포넌트화 하기 
- [x] #77 보너스 구현 사항 - TodoCount 컴포넌트 
- [x] #81 보너스 구현사항 - Event delegate 
- [x] #90 보너스 구현 사항 - 커스텀 이벤트 
- [x] #91 보너스 구현사항 - localStorage 
---
### 파일구조

```
├─ components/
│    └─ TodoList.js
│    └─ TodoInput.js
│    └─ TodoCount.js
├─ utils/
│    └─ errorCheck.js
│    └─ generateUniqueID.js
│    └─ localStorage.js
├─ validators/
│    └─ todoValidator.js
├─ App.js
├─ index.html
├─ index.js
├─ todoItem.js
├─ style.css
```

- `components/` : 렌더링되는 컴포넌트를 하나의 폴더에 모아두었습니다.
- `utils/` : 폴더 구조 구성에 대한 정확한 지식이 없습니다. 그래서 일단은 에러 체크, ID 생성, 스토리지 관련 함수 등 util로 활용할만한 파일들을 모아두었습니다.
- `App.js` : `component` 들을 생성하고, `state`를 관리합니다.
---
### 궁금한 점
1. `TodoInput` 컴포넌트 렌더링
  - **`TodoInput` 컴포넌트는 `state`가 변경되어도 굳이 다시 렌더링할 필요가 없는 컴포넌트 같습니다.** 이런 경우, 어떻게 하는 것이 좋은가요?
2. `TodoList` 컴포넌트 관련
  - 현재는 `TodoList`를 생성자 함수로 호출할 때, 하나의 객체를 넘겨주는데 여기에 `$app`, `initialState`, `deleteTodo`, `toggleTodo` 등이 포함됩니다. 
  - **"처음에는 `deleteTodo`와 같이 todo에 영향을 주는 함수들을 `TodoLIst` 컴포넌트 내부에 메서드로 정의했었는데, 현재와 같이 생성과 동시에 익명함수를 넘겨주는 것이 더 낫다고 생각해서 바꿨습니다. 이에 대한 멘토분들이나 다른 기수분들의 의견이 궁금합니다."**
