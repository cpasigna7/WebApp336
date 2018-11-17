from sqlalchemy import create_engine
from sqlalchemy import sql
from BarBeerDrinker import config

engine = create_engine(config.database_uri)

def get_bars():
    with engine.connect() as con:
        rs = con.execute("SELECT name, license, city, phone, addr, state FROM Bars")
        return[dict(row) for row in rs]
def find_bar(name):
    with engine.connect() as con:
        query = sql.text(
            "Select name, license, city, phone ,addr, state FROM Bars WHERE name = :name;"
        )

        rs = con.execute(query, name=name)
        result = rs.first()
        if result is None:
            return None
        return dict(result)
def find_bar_top10spenders(name):
    with engine.connect() as con:
        query = sql.text(
            " SELECT h1.Drinkersname, bn1.totalprice FROM Billsnew bn1 JOIN Has h1 on bn1.transactionID = h1.BillstransactionID where bn1.Barsname = :name  ORDER BY bn1.totalprice desc  Limit 10;"
        )
        rs = con.execute(query, name=name)
        results = [dict(row) for row in rs]
        for r in results:
            r['totalprice'] = float(r['totalprice'])
        return results
def find_bar_top10Beers(name, day):
    with engine.connect() as con:
        query = sql.text("""SELECT beername, sum(quantity) as Quantity
        from (SELECT b1.name as beername, bo1.quantity as quantity
        FROM Beers b1
        JOIN Sells s1 ON b1.name = s1.Itemsname
        JOIN Bought bo1 ON b1.name = bo1.Itemsname
        JOIN Has h1 ON h1.Barsname = s1.Barsname AND bo1.BillstransactionID = h1.BillstransactionID
        JOIN Billsnew bill ON bill.transactionID = h1.BillstransactionID AND bill.Barsname = s1.Barsname
        WHERE s1.Barsname = :name AND bill.dayd = :day) Quantity
        GROUP BY beername
        ORDER by quantity DESC
        LIMIT 10;"""
        )
        rs = con.execute(query, name=name, day=day)
        results = [dict(row) for row in rs]
        for r in results:
            r['Quantity'] = int(r['Quantity'])
        return results
def get_beers():
    with engine.connect() as con:
        rs = con.execute("Select name, manf from Beers")
        return[dict(row) for row in rs]

def find_beer(name):
    with engine.connect() as con:
        query = sql.text(
            "Select name, manf FROM Beers WHERE name = :name;"
        )
        rs = con.execute(query, name=name)
        result = rs.first()
        if result is None:
            return None
        return dict(result)

def find_beer_top10Bars(name):
    with engine.connect() as con:
        query = sql.text(
            "SELECT e.Barsname, SUM(e.quantity) as BeersSold FROM (SELECT bo1.BillstransactionID, bo1.quantity, bo1.Itemsname, bn1.Barsname FROM Billsnew bn1 JOIN Bought bo1 ON bo1.BillstransactionID = bn1.transactionID) as e where e.Itemsname = :name GROUP BY Barsname ORDER By BeersSold desc LIMIT 10;"
        )
        rs = con.execute(query, name=name)
        results = [dict(row) for row in rs]
        for r in results:
            r['BeersSold'] = float(r['BeersSold'])
        return results

def find_beer_top10Drinkers(name):
     with engine.connect() as con:
        query = sql.text(
            "SELECT h1.Drinkersname, SUM(bo1.quantity) AS amountBought FROM Billsnew bn1 JOIN Bought bo1 ON bo1.BillstransactionID = bn1.transactionID JOIN Has h1 ON h1.BillstransactionID = bn1.transactionID WHERE bo1.Itemsname = :name GROUP BY h1.Drinkersname ORDER BY amountBought desc LIMIT 10;"
        )
        rs = con.execute(query, name=name)
        results = [dict(row) for row in rs]
        for r in results:
            r['amountBought'] = int(r['amountBought'])
        return results

def get_manf():
    with engine.connect() as con:
        rs = con.execute("Select distinct manf from Beers;")
        return[dict(row) for row in rs]

def find_manf_region_sales(name):
    with engine.connect() as con:
        query = sql.text("""SELECT city, state, SUM(quantity) as Sold
        FROM (SELECT beer.manf as manf, bar.city as city, bar.state as state, bo.quantity as quantity
        FROM Beers beer
        JOIN Sells s ON beer.name = s.Itemsname
        JOIN Bars bar ON bar.name = s.Barsname
        JOIN Billsnew bill ON bill.Barsname = s.Barsname
        JOIN Bought bo ON bo.Itemsname = beer.name AND bo.BillstransactionID = bill.transactionID
        WHERE beer.manf = :name) Sold
        GROUP BY city
        order by Sold desc"""
        )
        rs = con.execute(query, name=name)
        results = [dict(row) for row in rs]
        for r in results:
            r['Sold'] = int(r['Sold'])
        return results

def get_bartenders_from_bar(name):
    with engine.connect() as con:
        query = sql.text(
            """SELECT *
        FROM Works w1
        WHERE w1.Barsname = :name;"""
        )
        rs = con.execute(query, name=name)
        results = [dict(row) for row in rs]
        if results is None:
            return None
        return results

def find_bartender_sales(name, bartender):
    with engine.connect() as con:
        query = sql.text("""
        SELECT e.Itemsname, SUM(e.quantity) as Sold, e.Itemsname, e.dayd, f.Dateday, e.timet 
        FROM
        (Select bo1.Itemsname, bn1.transactionID, bn1.timet, bn1.Barsname, bn1.dayd, bo1.quantity
        FROM Beers b1
        JOIN Bought bo1 ON bo1.Itemsname = b1.name
        JOIN Billsnew bn1 ON bn1.transactionID = bo1.BillstransactionID
        WHERE bn1.Barsname = :name) e,
        (Select w1.start, w1.end, w1.Dateday
        FROM Works w1
        WHERE w1.Bartendersname = :bartender AND w1.Barsname = :name) f
        WHERE e.dayd = f.Dateday AND
        (((str_to_date(e.timet, '%l:%i %p')) >= str_to_date(f.start, '%l:%i %p') 
        AND (str_to_date(e.timet, '%l:%i %p') <= str_to_date(f.end, '%l:%i %p')))
        OR
        ((str_to_date(e.timet, '%l:%i %p')) >= str_to_date(f.start, '%l:%i %p') 
        OR (str_to_date(e.timet, '%l:%i %p') <= str_to_date(f.end, '%l:%i %p'))))
        GROUP by e.Itemsname
        order by Sold desc
        LIMIT 10;"""
        )
        rs = con.execute(query, name=name, bartender=bartender)
        results = [dict(row) for row in rs]
        for r in results:
            r['Sold'] = int(r['Sold'])
        return results