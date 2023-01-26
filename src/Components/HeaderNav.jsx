import { NavLink } from 'react-router-dom'
import { useState } from 'react'
import { Button, Stack, Typography, Box } from '@mui/material/'
import { useImutableXContext } from '../Contexts/ImutableXContext'

const HeaderNav = () => {
  const { wallet, disconnect, linkSetup } = useImutableXContext()
  let activeStyle = {
    textDecorationColor: 'red',
    textDecorationThickness: '3px',
    textUnderlinePosition: 'under',
    textUnderlineOffset: '8px',
    color: 'white',
  }

  let inactiveStyle = {
    textDecoration: 'none',
    color: '#525252',
  }

  return (
    <Stack direction="column" sx={{ p: 5 }}>
      <Stack direction="row" alignItems="center">
        <Typography
          variant="h1"
          component="div"
          align="center"
          sx={{
            fontFamily: 'Bebas Neue',
            color: 'white',
            fontSize: '36px',
            fontWeight: '700',
          }}
        >
          RocketCarGarage
        </Typography>

        <nav style={{ marginLeft: '83px' }}>
          <ul
            style={{
              listStyleType: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '40px',
            }}
          >
            <li>
              <NavLink
                to="/"
                style={({ isActive }) =>
                  isActive ? activeStyle : inactiveStyle
                }
              >
                <Typography
                  sx={{
                    fontFamily: 'Inter',
                    fontSize: '16px',
                    fontWeight: '500',
                  }}
                >
                  <img
                    src={require('../assets/market_place.svg')}
                    alt="marketPlace"
                  />
                  Marketplace
                </Typography>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/inventory"
                style={({ isActive }) =>
                  isActive ? activeStyle : inactiveStyle
                }
              >
                <Typography
                  sx={{
                    fontFamily: 'Inter',
                    fontSize: '16px',
                    fontWeight: '500',
                  }}
                >
                  Inventory
                </Typography>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/racetrack"
                style={({ isActive }) =>
                  isActive ? activeStyle : inactiveStyle
                }
              >
                <Typography
                  sx={{
                    fontFamily: 'Inter',
                    fontSize: '16px',
                    fontWeight: '500',
                  }}
                >
                  Race Track
                </Typography>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/chopshop"
                style={({ isActive }) =>
                  isActive ? activeStyle : inactiveStyle
                }
              >
                <Typography
                  sx={{
                    fontFamily: 'Inter',
                    fontSize: '16px',
                    fontWeight: '500',
                  }}
                >
                  Chop Shop
                </Typography>
              </NavLink>
            </li>
          </ul>
        </nav>

        {/* <WalletInfo /> */}

        <Button
          sx={{
            marginLeft: 'auto',
            height: '40px',
            fontFamily: 'Inter',
            fontSize: '16px',
            fontWeight: '500',
            color: 'white',
          }}
          onClick={wallet ? disconnect : linkSetup}
        >
          {wallet ? 'Disconnect' : 'Connect'}
        </Button>
      </Stack>
      {/* {handleTabs()} */}
    </Stack>
  )
}

export default HeaderNav
