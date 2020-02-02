# Generate a random number
## One qbit circuit
```
{
    level: 2,
    registers: [
        [
            {
                name: 'H',
                option: null
            }
        ]
    ]
}
```

# Entangle state
## Two qbits circuit
```
{
    level: 3,
    registers: [
        [
            {
                name: 'H',
                option: null
            },
            {
                name: 'CX',
                option: 'control'
            }
        ],
        [
            {
                name: 'CX',
                option: 'target'
            }
        ]
    ]
}

```

# GHZ state (Greenberger–Horne–Zeilinger state)
## Three qbits circuit
```
{
    level: 4,
    registers: [
        [
            {
                name: 'H',
                option: null
            },
            {
                name: 'CX',
                option: 'control'
            }
        ],
        [
            {
                name: 'CX',
                option: 'target'
            },
            {
                name: 'CX',
                option: 'control'
            }
        ],
        [
            {
                name: 'CX',
                option: 'target'
            }
        ]
    ]
}
```

# Superdense coding
## Two qbits circuit

```
{
    level: 5,
    registers: [
        [
            {
                name: 'barrier',
                option: null
            },
            {
                name: 'H',
                option: null
            },
            {
                name: 'CX',
                option: 'control'
            },
            {
                name: 'barrier',
                option: null
            },
            {
                name: 'Z',
                option: null
            },
            {
                name: 'X',
                option: null
            },
            {
                name: 'barrier',
                option: null
            },
            {
                name: 'CX',
                option: 'control'
            },
            {
                name: 'H',
                option: null
            },
            {
                name: 'barrier',
                option: null
            },
        ],
        [
            {
                name: 'barrier',
                option: null
            },
            {
                name: 'CX',
                option: 'target'
            },
            {
                name: 'barrier',
                option: null
            },
            {
                name: 'barrier',
                option: null
            },
            {
                name: 'CX',
                option: 'target'
            },
            {
                name: 'barrier',
                option: null
            },
        ]
    ]
}
```
