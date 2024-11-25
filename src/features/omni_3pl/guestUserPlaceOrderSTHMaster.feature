Feature: Place Order With Master Card STH

  Background: User launches url
      Given the user launches the url
    # Given the user launches the SAP url and login to SAP

  @e2e
  Scenario Outline: User should able to place order with master card sth
          Then the user enters text "9765" in textbox with placeholder "Postal Code, City, or Store Number"
          Then the user clicks on the webelement with html tag "title" as "Search"
          Then the user waits for webelement "hdca-store-list-item__column-store" with html attribute "class" to be visible
          Then the user click on "Select"
          # Then the user enters text sku in textbox with placeholder "What can we help you find?"
          Then the user enters text "<sku>" in textbox with placeholder "What can we help you find?"
          Then the user clicks on the webelement with html tag "class" as "acl-action-button"
          Then the user waits for webelement "hdca-product__description" with html attribute "class" to be visible
          Then the user add product to cart
          # Then the user waits for webelement "acl-modal__container acl-display--block" with html attribute "class" to be visible
          Then the user click on "View Cart"
          Then the user waits for webelement "acl-image__image" with html attribute "class" to be visible
          Then the user clicks the webelement containing html tag "id" as "fulfillment_SHIP_TO_HOME_"
          #  Then the user clicks the webelement containing html tag "id" as "fulfillment_FDC_"
          Then the user click on "Checkout Now"
          Then the user waits for text "Secure Checkout" to be visible
          Then the user click on "Checkout as Guest"
          Then the user waits for webelement "hdca-checkout-header__title" with html attribute "class" to be visible
          Then the user validates if "Delivery:" text is visible
          Then the user enters text "<firstName>" in the textbox " First Name"
          Then the user enters text "<lastName>" in the textbox " Last Name "
          Then the user enters random email in the textbox " Email Address "
          Then the user enters text "<phone>" in the textbox " Phone Number "
          Then the user enters text "<address>" in textbox with placeholder "Start typing your address..."
          Then the user enters text "<city>" in the textbox " City"
          Then the user enters value "<province>" in dropdown "Province"
          Then the user click on "Continue"
          Then the user waits for text "Credit Card" to be visible
          Then the user switches to the frame "__zoid__card_sdk"
          Then the user enters the "Mastercard" card details
          Then the user switches to the parent frame
          Then the user enters billing details for "Mastercard" card
          Then the user click on "Continue"
          Then the user waits for text "Place Order " to be visible
    ####Then the user waits for place order button to be visible
          Then the user clicks on text "Place Order" at index "2"
          Then the user waits for webelement "acl-container acl-container--theme-dark acl-p--small" with html attribute "class" to be visible
          Then the user validates if " Your order was successful. " text is visible
          Then the user validates if the webelement with html attribute "class" as "acl-col--12 acl-text-size--x-large" has text "Order Number"
          Then the user save created order number in json file
            ###Integration#
                      ##### Authorization
           Then the user launches the SAP url and login to SAP
            Then the user check the order details with Tcode /nva03
            Then the user do the authorization for STH order
            # #              # PO Creation
              Then the user generate IDOC for creating PO
              Then the user process the IDOC number to generate PO with Tcode /nBD87
            Then the user checks the PO with Tcode /nva03

            # #             # Delivery Creation (Dint Delivery)
            Then the user execute delivery creation
            Then the user check the delivery creation /nva03
            # #           ###### Picking (POGI)Purchase order goods issue
            Then the user enter picked qty and mark the Picking /nva03
            Then the user clicks on post goods issue to generate GI /nva03
            Then the user verify GI created inside PO /nva03

            # #         ###----------------Goods Receipt
            Then the user enter Goods Receipt /nva03
            Then the user process with RSNAST

            Then the user check the Outbound Delivery /nva03
            Then the user do the MIGO

            # #  -----------------Release PGI-------------------
            Then the user go to OBD PGI for releasing the delivery /nsa38
            Then the user go to va03 to verify GI status /nva03


            #########---------billing block removal------------------
            Then the user removes Billing Block /nsa38
            Then the user verify billing block removed /nva03
            # ##  ----------------F2 Invoice Steps-------------------
              Then the user process F2 Invoice Updated
              Then the user goto sa37 to verify job invoice job status /nsm37
              Then the user verify that the invoice is created /nva03
    
    Examples:
      | firstName | lastName    | address       | city        | province | postalCode | phone      | userName | password | sku        |
      | Address   | WebdriverIO | 621 Rue Habel | Scarborough | Ontario  | M1R 4E6    | 4700148224 | SXM8MZQ  | xxxx     | 1000740986 |