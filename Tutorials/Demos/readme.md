# Queries and Mutations

http://graphql.org/learn/queries/

> On this page, you'll learn in detail about how to query a GraphQL server.


## Fields

```grapyql

{
    hero {
        name
    }
}

```

```js

{
    "data": {
        "hero": {
            "name": "R2-D2"
        }
    }
}

```

```grapyql

{
    hero {
        name
        # Queries can have comments!
        friends {
            name
        }
    }
}

```

```js

{
    "data": {
        "hero": {
            "name": "R2-D2",
            "friends": [
                {
                    "name": "Luke Skywalker"
                },
                {
                    "name": "Han Solo"
                },
                {
                    "name": "Leia Organa"
                }
            ]
        }
    }
}

```



## Arguments



```grapyql

{
    human(id: "1000") {
        name
        height
    }
}

```

```js

{
    "data": {
        "human": {
            "name": "Luke Skywalker",
            "height": 1.72
        }
    }
}


```


```grapyql

{
    human(id: "1000") {
        name
        height(unit: FOOT)
        # FOOT 英尺
        # https://en.wikipedia.org/wiki/Foot_(unit)
    }
}


{
    human(id: "1000") {
        name
        # height # default unit === METER
        # height(unit: METER) # 1.72
        height(unit: FOOT) # 5.6430448
        appearsIn
        friends {
            __typename
            name
            appearsIn
        }
        starships{
            id
        }
        friendsConnection{
            pageInfo{
                startCursor
                endCursor
                hasNextPage
            }
        }
    }
}

```

```js

{
    "data": {
        "human": {
            "name": "Luke Skywalker",
            "height": 5.6430448
        }
    }
}

```




## Aliases


```grapyql

{
    empireHero: hero(episode: EMPIRE) {
        name
    }
    jediHero: hero(episode: JEDI) {
        name
    }
}

```

```js

{
    "data": {
        "empireHero": {
            "name": "Luke Skywalker"
        },
        "jediHero": {
            "name": "R2-D2"
        }
    }
}

```


## Fragments


```grapyql

{
    leftComparison: hero(episode: EMPIRE) {
        ...comparisonFields
    }
    rightComparison: hero(episode: JEDI) {
        ...comparisonFields
    }
}

fragment comparisonFields on Character {
    name
    appearsIn
    friends {
        name
    }
}

```

```js

{
    "data": {
        "leftComparison": {
            "name": "Luke Skywalker",
            "appearsIn": [
                "NEWHOPE",
                "EMPIRE",
                "JEDI"
            ],
            "friends": [
                {
                "name": "Han Solo"
                },
                {
                "name": "Leia Organa"
                },
                {
                "name": "C-3PO"
                },
                {
                "name": "R2-D2"
                }
            ]
        },
        "rightComparison": {
            "name": "R2-D2",
            "appearsIn": [
                "NEWHOPE",
                "EMPIRE",
                "JEDI"
            ],
            "friends": [
                {
                "name": "Luke Skywalker"
                },
                {
                "name": "Han Solo"
                },
                {
                "name": "Leia Organa"
                }
            ]
        }
    }
}

```


## Variables 

> query


```grapyql

query HeroNameAndFriends($episode: Episode) {
    hero(episode: $episode) {
        name
        friends {
            name
        }
    }
}

```

```json

{
    "episode": "JEDI"
}

```

```js

{
    "data": {
        "hero": {
            "name": "R2-D2",
            "friends": [
                {
                "name": "Luke Skywalker"
                },
                {
                "name": "Han Solo"
                },
                {
                "name": "Leia Organa"
                }
            ]
        }
    }
}

```


## Variable definitions


```grapyql

($episode: Episode)

#  It lists all of the variables, prefixed by $, followed by their type, in this case `Episode`.

# All declared variables must be either scalars, enums, or input object types. 
# 所有声明的变量必须是`标量`，枚举或输入对象类型。

# Variable definitions can be optional or required. 
# In the case above, since there isn't an `!` next to the Episode type, it's optional.

```

```js

query HeroNameAndFriends($episode: Episode) {
    hero(episode: $episode) {
        name
        friends {
            name
        }
    }
}

```

## Default variables


```grapyql

query HeroNameAndFriends($episode: Episode = "JEDI") {
    hero(episode: $episode) {
        name
        friends {
            name
        }
    }
}

# When default values are provided for all variables, you can call the query without passing any variables.

# If any variables are passed as part of the variables dictionary, they will override the defaults.

```

## Operation name


```md
# One thing we also saw in the example above is that our query has acquired an operation name. 
# Up until now, we have been using a `shorthand syntax` where we omit both the `query keyword` and the `query name`,

# For example, in JavaScript we can easily work only with anonymous functions, 
# but when we give a function a name, it's easier to track it down, debug our code, and log when it's called.

```

## Directives



```grapyql

query Hero($episode: Episode, $withFriends: Boolean!) {
    hero(episode: $episode) {
        name
        friends @include(if: $withFriends) {
            name
        }
    }
}

# The core GraphQL specification includes exactly two directives, 
# which must be supported by any spec-compliant GraphQL server implementation:

# @include(if: Boolean) Only include this field in the result if the argument is true.
# @skip(if: Boolean) Skip this field if the argument is true.


```

```json

{
    "episode": "JEDI",
    "withFriends": false
}

{
    "episode": "JEDI",
    "withFriends": true
}

```


```js

{
    "data": {
        "hero": {
            "name": "R2-D2"
        }
    }
}


{
    "data": {
        "hero": {
            "name": "R2-D2",
            "friends": [
                {
                "name": "Luke Skywalker"
                },
                {
                "name": "Han Solo"
                },
                {
                "name": "Leia Organa"
                }
            ]
        }
    }
}

```

## Mutations

> mutation 

```grapyql

mutation CreateReviewForEpisode($ep: Episode!, $review: ReviewInput!) {
    createReview(episode: $ep, review: $review) {
        stars
        commentary
    }
}

# This can be useful for fetching the new state of an object after an update. 

# This is especially useful when mutating existing data, 
# for example, when incrementing a field, since we can mutate and query the new value of the field with one request.

# in this example, the review variable we passed in is not a `scalar`. 
# It's an `input object type`, a special kind of object type that can be passed in as an argument. 

```

```json

{
    "ep": "JEDI",
    "review": {
        "stars": 5,
        "commentary": "This is a great movie!"
    }
}

```

```js

{
    "data": {
        "createReview": {
            "stars": 5,
            "commentary": "This is a great movie!"
        }
    }
}

```

## Multiple fields in mutations 


```grapyql

# A mutation can contain multiple fields, just like a query.
# There's one important distinction between queries and mutations, other than the name:

# While query fields are executed `in parallel`, mutation fields run `in series`, one after the other.

# This means that if we send two incrementCredits mutations in one request, 
# the first is guaranteed to finish before the second begins, 
# ensuring that we don't end up with a `race condition` with ourselves.

# 竞争条件

```


## Inline Fragments 

http://graphql.org/learn/schema/#interfaces
http://graphql.org/learn/schema/#union-types

```grapyql

# If you are querying a field that returns an interface or a union type, 
# you will need to use `inline fragments` to access data on the `underlying concrete type`. 

# 如果要查询一个返回一个`接口`或一个`联合类型`的字段，则需要使用内联片段来访问`底层具体类型`的数据。


query HeroForEpisode($ep: Episode!) {
    hero(episode: $ep) {
        name
        ... on Droid {
            primaryFunction
        }
        ... on Human {
            height
        }
    }
}

```

```json

{
    "ep": "JEDI"
}

```


```js

{
    "data": {
        "hero": {
            "name": "R2-D2",
            "primaryFunction": "Astromech"
        }
    }
}

```

## Meta fields



```grapyql

# GraphQL allows you to request `__typename`, a meta field, 
# at any point in a query to get the name of the object type at that point.

{
    search(text: "an") {
        __typename
        ... on Human {
            name
        }
        ... on Droid {
            name
        }
        ... on Starship {
            name
        }
    }
}

# In the above query, search returns a `union type` that can be one of three options.
# It would be impossible to `tell apart` the different types from the client without the `__typename` field.
# 分辨

# GraphQL services provide a few meta fields, the rest of which are used to expose the `Introspection` system.
# GraphQL服务提供了一些元字段，其余的用于公开“内省”系统。

# introspection, self-examination 内省 自我检查




```

```js

{
    "data": {
        "search": [
            {
                "__typename": "Human",
                "name": "Han Solo"
            },
            {
                "__typename": "Human",
                "name": "Leia Organa"
            },
            {
                "__typename": "Starship",
                "name": "TIE Advanced x1"
            }
        ]
    }
}

```





# Schemas and Types


http://graphql.org/learn/schema

> On this page, you'll learn all you need to know about the GraphQL type system and how it describes what data can be queried.


```grapyql




```

```js



```



http://graphql.org/blog/



# Introspection

http://graphql.org/learn/introspection/

```grapyql

```

```json

```

```js

```


# Validation

http://graphql.org/learn/validation/

```grapyql

```

```json

```

```js

```


# Execution

http://graphql.org/learn/execution/

```grapyql

```

```json

```

```js

```



# BEST PRACTICES

## GraphQL Best Practices

> The GraphQL specification is intentionally silent on a handful of important issues facing APIs such as dealing with the network, authorization, and pagination.

http://graphql.org/learn/best-practices/


http://graphql.org/learn/thinking-in-graphs/

![](http://graphql.org/img/diagrams/business_layer.png)

http://graphql.org/learn/serving-over-http/

http://graphql.org/learn/authorization/

http://graphql.org/learn/pagination/

http://graphql.org/learn/caching/







