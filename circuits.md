# Generate a random number
## One qbit circuit
```
{
    level: 2,
    circuit: [
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
    circuit: [
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
    circuit: [
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
    circuit: [
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