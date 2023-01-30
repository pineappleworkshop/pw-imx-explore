import { NavLink } from 'react-router-dom'
import { useState } from 'react'
import { Button, Stack, Typography } from '@mui/material/'
import { useImutableXContext } from '../Contexts/ImutableXContext'
import { HiOutlineShoppingCart } from 'react-icons/hi'
import { AiOutlinePoweroff } from 'react-icons/ai'
import WalletInfo from './WalletInfo'

const HeaderNav = () => {
  const { wallet, disconnect, linkSetup } = useImutableXContext()
  let activeStyle = {
    display: 'flex',
    alignItems: 'center',
    textDecorationColor: 'red',
    textDecorationThickness: '3px',
    textUnderlinePosition: 'under',
    textUnderlineOffset: '8px',
    color: 'white',
  }

  let inactiveStyle = {
    display: 'flex',
    alignItems: 'center',
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
              marginTop: '10px',
            }}
          >
            <li>
              <NavLink
                to="/"
                style={({ isActive }) =>
                  isActive ? activeStyle : inactiveStyle
                }
              >
                <span style={{ marginRight: '8px' }}>
                  <HiOutlineShoppingCart />
                </span>
                <Typography
                  sx={{
                    fontFamily: 'Inter',
                    fontSize: '16px',
                    fontWeight: '500',
                  }}
                >
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
        <Stack
          direction="row"
          alignItems="center"
          sx={{ marginLeft: 'auto', gap: '16px' }}
        >
          {wallet && <WalletInfo />}

          <Typography
            sx={{
              marginLeft: 'auto',
              height: '40px',
              fontFamily: 'Inter',
              fontSize: '16px',
              fontWeight: '500',
              color: 'white',
              cursor: 'pointer',
              marginTop: '10px',
              '&:hover': {
                color: 'red',
              },
            }}
            onClick={wallet ? disconnect : linkSetup}
          >
            {wallet ? <AiOutlinePoweroff /> : 'Connect'}
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  )
}

export default HeaderNav
